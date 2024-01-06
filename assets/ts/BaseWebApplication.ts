import { BaseEnable } from '~/assets/ts/template'

export const BaseTitleDisplay = reactive({
  parent: '',
  childs: [''],
})
export function clearChilds() {
  BaseTitleDisplay.childs.splice(0, BaseTitleDisplay.childs.length)
}
export function addTitle(title: string) {
  const len = BaseTitleDisplay.childs.length
      if (len <= 0) {
        BaseTitleDisplay.childs.push(title)
        return
      }
      let valid = false
      let index = 0
      for (let i = 0; i < BaseTitleDisplay.childs.length; i++){
        if (BaseTitleDisplay.childs[i] === title) {
          for (let j = i+1; j < BaseTitleDisplay.childs.length; j++){
            BaseTitleDisplay.childs.pop()
          }
          valid=true
          break
        }
      }
      if (valid) {
        return
      }
      BaseTitleDisplay.childs.push(title)
}
export const ActivePages = reactive({
  OverviewPage: BaseEnable.active,
  /**
   * ME -> medical examination
   */
  MEPage: BaseEnable.active,
  AppointmentPage: BaseEnable.active,
  /**
   * PR -> Patient Records
   */
  PRPage: BaseEnable.active,
  /**
   * LA -> List Account
   */
  LAPage: BaseEnable.active,
  /**
   * MM -> Medication management
   */
  MMPage: BaseEnable.active,
  /**
   * SM -> Service management
   */
  SMPage: BaseEnable.active,
  /**
   * RM -> Report management
   */
  RMPage: BaseEnable.active,

})
