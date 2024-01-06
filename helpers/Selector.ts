import { Type } from '@/constants/constants'
import { CustomReflect } from './Decorator'

export class InputTypeSelector {
  public static object: object

  public static getKeys(object: object) {
    return Object.keys(object)
  }

  public static getPropetyAndType(object: { [key: string]: any }) {
    const type = new Map<string, string>()
    const propertyNames = this.getKeys(object)
    propertyNames.forEach((element: any) => {
      const tp = `${typeof (object[element])}`.toLowerCase()
      if(tp =='undefined'){
        return
      }
      if (this.isDateType(element)) {
        type.set(element, Type.DATE)
        return
      }
      if (tp === 'string'){
        type.set(element, Type.TEXT)
        return
      }
      if (tp === 'number'){
        type.set(element, Type.NUMBER)
        return
      }
      if(tp === 'object'){
        type.set(element,Type.SELECT)
        return
      }
    })
    return type
  }

  private static isDateType(nameProp: string) {
    nameProp = nameProp.toLowerCase()
    if (nameProp.includes('day'))
      return true
    if (nameProp.includes('date'))
      return true
    return false
  }
}
