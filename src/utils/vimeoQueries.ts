import {
  OptionalVideoBlockWithLinks,
  VideoLinkObject,
  VideoLoopLinks,
} from "@/types/video";
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

export const getVideoLoopDirectLinks = async (projects: Project[]) => {
  try {
    const results: VideoLoopLinks[] = await Promise.all(
      projects.map(async (project) => {
        const { loop16by9, loop9by16 } = project.videoLoop || {};

        const loop16by9Links = loop16by9
          ? await fetchVimeoDirectLinks(loop16by9)
          : null;
        const loop9by16Links = loop9by16
          ? await fetchVimeoDirectLinks(loop9by16)
          : null;

        return { projectId: project.id, loop16by9Links, loop9by16Links };
      })
    );
    return results;
  } catch (error) {
    console.error("Error fetching Vimeo loop links", error);
    return [];
  }
};

export const getMainVideoDirectLinks = async (project: Project) => {
  try {
    const { mainVideo } = project;
    if (!mainVideo) return null;
    const results: VideoLinkObject[] = await fetchVimeoDirectLinks(mainVideo);

    return results;
  } catch (error) {
    console.error("Error fetching Vimeo main video links", error);
    return null;
  }
};

export const getOptionalVideoDirectLinks = async (project: Project) => {
  try {
    if (!project.optionalBlocks) return [];

    const videoBlockPromises = project.optionalBlocks.map(
      async (block, index) => {
        // Handle single video block
        if (block?.__typename === "ProjectOptionalBlocksSingleVideo") {
          const links = await fetchVimeoDirectLinks(block.video);

          return {
            blockIndex: index,
            blockType: "single",
            video: block.video,
            version: block.version,
            links,
          };
        }

        // Handle triple video block
        if (block?.__typename === "ProjectOptionalBlocksTripleVideo") {
          const [videoOneLinks, videoTwoLinks, videoThreeLinks] =
            await Promise.all([
              fetchVimeoDirectLinks(block.videoOne),
              fetchVimeoDirectLinks(block.videoTwo),
              fetchVimeoDirectLinks(block.videoThree),
            ]);

          return {
            blockIndex: index,
            blockType: "triple",
            videos: {
              videoOne: block.videoOne,
              videoTwo: block.videoTwo,
              videoThree: block.videoThree,
            },
            links: {
              videoOne: videoOneLinks,
              videoTwo: videoTwoLinks,
              videoThree: videoThreeLinks,
            },
          };
        }

        return null;
      }
    );

    const results = await Promise.all(videoBlockPromises);
    return results.filter(
      (result): result is OptionalVideoBlockWithLinks => result !== null
    );
  } catch (error) {
    console.error("Error fetching Vimeo optional video links:", error);
    return [];
  }
};

export function getVideoLinkByRendition(
  videos: VideoLinkObject[],
  rendition: string
): string {
  const video = videos.find((video) => video.rendition === rendition);
  return video ? video.link : "";
}
