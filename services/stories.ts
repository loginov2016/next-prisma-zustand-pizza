import { Story, StoryItem } from "@prisma/client";
import { axiosInstance } from "./instance";

export type TStory = Story & {
    storyItems: StoryItem[];
}
export const getAll = async (): Promise<TStory[]> => {
    const { data } = await axiosInstance.get<TStory[]>('/stories');
    return data;
}