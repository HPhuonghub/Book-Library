import EventEmiiter from "events";

const _emitter = new EventEmiiter();
_emitter.setMaxListeners(0);

export const emitter = _emitter;
