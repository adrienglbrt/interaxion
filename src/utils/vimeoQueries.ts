import { VideoDirectLinks } from "@/types/interfaces";
import { Project } from "../../tina/__generated__/types";

const VIMEO_ACCESS_TOKEN = process.env.VIMEO_ACCESS_TOKEN;

if (!VIMEO_ACCESS_TOKEN) {
  console.error("VIMEO_ACCESS_TOKEN is not set in the environment variables");
}

async function fetchVimeoDirectLinks(videoId: string) {
  if (!videoId) {
    console.warn("Attempted to fetch Vimeo link with empty videoId");
    return null;
  }
  try {
    const response = await fetch(`https://api.vimeo.com/videos/${videoId}`, {
      headers: {
        Authorization: `Bearer ${VIMEO_ACCESS_TOKEN}`,
        Accept: "application/vnd.vimeo.*+json;version=3.4",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data.files;
  } catch (error) {
    console.error(`Failed to fetch Vimeo data for ID ${videoId}:`, error);
    return null;
  }
}

export const getVimeoDirectLinks = async (
  activeShowcasedProjects: Project[]
) => {
  try {
    const results: VideoDirectLinks[] = await Promise.all(
      activeShowcasedProjects.map(async (project) => {
        const { loop16by9, loop9by16 } = project.videoLoop || {};

        const linksLoop16by9 = loop16by9
          ? await fetchVimeoDirectLinks(loop16by9)
          : null;
        const linksLoop9by16 = loop9by16
          ? await fetchVimeoDirectLinks(loop9by16)
          : null;

        return { projectId: project.id, linksLoop16by9, linksLoop9by16 };
      })
    );
    return results;
  } catch (error) {
    console.error("Error fetching Vimeo loop links", error);
    return [];
  }
};