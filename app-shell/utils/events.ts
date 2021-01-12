import { Theme } from "@material-ui/core";

export const eventsToDispatch = {
  HOST_THEME_CHANGED: 'HOST_THEME_CHANGED'
};

const dispatchEvent = (event: string, data: Theme) =>
  window.dispatchEvent(new CustomEvent(event, { detail: data }));

export default dispatchEvent;
