export const BaseEnable = reactive({
  header_margin_left: '280px', // margin left of header
  main_margin_left: '300px', // margin left of main content
  sidebar_width: '300px', // width sidebar
  isEnabled: false,
  isHidden: false,
  active: 'collapsed',
})
export async function onClick() {
  if (!BaseEnable.isEnabled) {
    BaseEnable.isEnabled = true
    BaseEnable.main_margin_left = '90px'
    BaseEnable.header_margin_left = '46px'
    BaseEnable.sidebar_width = '93px'
    BaseEnable.isHidden = true
    return
  }
  BaseEnable.isEnabled = false
  BaseEnable.main_margin_left = '300px'
  BaseEnable.header_margin_left = '280px'
  BaseEnable.sidebar_width = '300px'
  await delay(120)
  BaseEnable.isHidden = false
}
export async function onResize() {
  const width = window.innerWidth
}
async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}
