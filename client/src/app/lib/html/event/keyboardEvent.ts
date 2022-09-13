const ENTER_CODE = '13';

export function isEnter(event: KeyboardEvent) {
  console.log('=== isEnter', event);
  return event.code === ENTER_CODE;
}
