import { NextResponse } from "next/server";

const GITHUB_GRAPHQL = "https://api.github.com/graphql";

// GitHub GraphQL API — only fields that actually exist
const CONTRIBUTIONS_QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
              contributionLevel
            }
          }
        }
      }
      repositories(first: 1, ownerAffiliations: OWNER, isFork: false, privacy: PUBLIC) {
        totalCount
      }
    }
  }
`;

const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};

type ContributionDay = {
  date: string;
  contributionCount: number;
  contributionLevel: string;
};

type Week = { contributionDays: ContributionDay[] };

function calculateStreaks(weeks: Week[]) {
  const days = weeks
    .flatMap((w) => w.contributionDays)
    .sort((a, b) => a.date.localeCompare(b.date));

  let longestStreak = 0;
  let tempStreak = 0;

  for (const day of days) {
    if (day.contributionCount > 0) {
      tempStreak++;
      longestStreak = Math.max(longestStreak, tempStreak);
    } else {
      tempStreak = 0;
    }
  }

  // Current streak from today backwards
  let currentStreak = 0;
  const today = new Date().toISOString().split("T")[0];
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].date > today) continue;
    if (days[i].contributionCount > 0) {
      currentStreak++;
    } else {
      break;
    }
  }

  return { currentStreak, longestStreak };
}

export async function GET() {
  const token = process.env.GITHUB_TOKEN;
  const username = process.env.GITHUB_USERNAME ?? "danyprastya";

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token not configured" },
      { status: 500 }
    );
  }

  try {
    const res = await fetch(GITHUB_GRAPHQL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: CONTRIBUTIONS_QUERY,
        variables: { username },
      }),
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API HTTP error: ${res.status}`);
    }

    const json = await res.json();

    if (json.errors) {
      console.error("[GitHub] GraphQL errors:", json.errors);
      throw new Error(json.errors[0]?.message ?? "GraphQL error");
    }

    const user = json.data?.user;
    if (!user) {
      throw new Error(`GitHub user '${username}' not found`);
    }

    const calendar = user.contributionsCollection.contributionCalendar;
    const weeks: Week[] = calendar.weeks;

    const contributions = weeks.flatMap((week) =>
      week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] ?? 0,
      }))
    );

    const { currentStreak, longestStreak } = calculateStreaks(weeks);

    return NextResponse.json({
      contributions,
      stats: {
        totalContributions: calendar.totalContributions,
        currentStreak,
        longestStreak,
        totalRepositories: user.repositories.totalCount,
      },
    });
  } catch (err) {
    console.error("[GitHub] Error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Failed to fetch GitHub data" },
      { status: 500 }
    );
  }
}
