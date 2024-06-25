export interface TabChangeInfo {
  /**
   * The tab's loading status.
   */
  status?: chrome.tabs.TabStatus;

  /**
   * The tab's URL if it has changed.
   */
  url?: string;

  /**
   * The tab's new group.
   *
   * @since Chrome 88
   */
  groupId?: number;

  /**
   * The tab's new pinned state.
   */
  pinned?: boolean;

  /**
   * The tab's new audible state.
   *
   * @since Chrome 45
   */
  audible?: boolean;

  /**
   * The tab's new discarded state.
   *
   * @since Chrome 54
   */
  discarded?: boolean;

  /**
   * The tab's new auto-discardable state.
   *
   * @since Chrome 54
   */
  autoDiscardable?: boolean;

  /**
   * The tab's new muted state and the reason for the change.
   *
   * @since Chrome 46
   */
  mutedInfo?: chrome.tabs.MutedInfo;

  /**
   * The tab's new favicon URL.
   */
  favIconUrl?: string;

  /**
   * The tab's new title.
   *
   * @since Chrome 48
   */
  title?: string;
}
