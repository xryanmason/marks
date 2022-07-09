import { assertIsDefined } from "../utils/assertIsDefined";

export const createTabDataAccessor = (tabApi: typeof browser.tabs) => {
  const createTab = async (url: string, openInReaderMode?: boolean) => {
    await browser.tabs.create({
      openInReaderMode,
      url,
    });
  };
  const closeCurrentTab = async () => {
    const currentTabId = (await tabApi.getCurrent()).id;
    assertIsDefined(currentTabId);
    await tabApi.remove(currentTabId);
  };
  return { closeCurrentTab, createTab };
};

// TODO: figure out how to make vitest play nice with browser.tabs
// maybe look at https://vitest.dev/guide/mocking.html#globals
// eslint-disable-next-line
export const tabData = (
  import.meta.env.MODE !== "test"
    ? createTabDataAccessor(browser.tabs)
    : undefined
)!;

export type TabData = typeof tabData;
