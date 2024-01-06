import 'reflect-metadata'
export class CustomReflect{

  /**
   * assign a label for property to display on the interface
   * @param displayName - display name
   * @returns 
   */
  public static label(displayName: string){
    return function (target: any, key: string) {
      // Thêm metadata (nhãn) sử dụng Reflect
      Reflect.defineMetadata('label', displayName, target, key)
    }
  }
  /**
   * Get the metdata value with metadata key is "label" on the target object or its prototype chain
   * @param target - any object
   * @param key - name of property
   * @returns 
   */
  public static getLabel(target: any, key: string): string {
    return Reflect.getMetadata('label', target, key)
  }
  /**
   * Get the metadata value with metadata key is "enabled" on the target object or its prototype chain
   * @param target  - any object
   * @param key - name of property
   * @returns 
   */
  public static isDisabled(target: any,key: string): boolean{
    return Reflect.getMetadata('disabledInputForm',target,key) === true
  }
  public static defineMetadata(metadataKey: any,metadataValue: any){
    return function(target: any,key: string){
      Reflect.defineMetadata(metadataKey,metadataValue,target,key)
    }
  }
  /**
   * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
   * @param metadataKey - metadata key used to store and retrieve data
   * @param target - any object
   * @param key - name of property
   * @returns 
   */
  public static getMetadata(metadataKey: any,target: any, key: string): any{
    return Reflect.getMetadata(metadataKey,target,key)
  }
  /**
   * Determine which property is allowed to display on the form
   * @param isEnabled - true or false
   * @returns 
   */
  public static disabledInputForm(isEnabled: boolean){
    return function (target: any,key: string){
      Reflect.defineMetadata("disabledInputForm",isEnabled,target,key)
    }
  }
  /**
   * set propety is a input special
   * @param isSpecialType - true or false
   * @returns 
   */
  public static setSpecialType(isSpecialType: boolean){
    return function(target: any, key: string){
      Reflect.defineMetadata('SpecialType',isSpecialType,target,key)
    }
  }
  /**
   * 
   * @param target - any object
   * @param key - name of property
   * @returns 
   */
  public static isSpecialType(target: any, key: string): boolean{
    return Reflect.getMetadata("SpecialType",target,key) === true
  }
  /**
   * set property will use combobox input
   * @param datasource - The name of the source to reference to
   * @returns 
   */
  public static useCombobox(datasource: string){
    return function(target:any,key: string){
      Reflect.defineMetadata("combobox",datasource,target,key)
    }
  }
  /**
   * get name DataSource Of Combobox
   * @param target - object manager
   * @param key - name property
   * @returns 
   */
  public static getDataSourceOfCombobox(target:any,key: string):string{
    return Reflect.getMetadata("combobox",target,key)
  }
  /**
   * set text layout
   * @param possition - start,end,center
   * @returns 
   */
  public static setTextLayout(possition: string){
    return function(target: any, key: string){
      Reflect.defineMetadata('possition',possition,target,key)
    }
  }
  public static getTextLayout(target: any,key: string):string{
    return Reflect.getMetadata('possition',target,key)
  }
  /**
   * determine which property is allowed to display on the datagridview
   * @param enabled - true or false
   * @returns 
   */
  public static disabledDatagrid(enabled: boolean){
    return function(target: any, key: string){
      Reflect.defineMetadata('enabledDatagrid',enabled,target,key)
    }
  }
  public static isDisabledDatagrid(target: any, key: string): boolean{
    return Reflect.getMetadata("enabledDatagrid",target,key) === true
  }

  public static enableDeleteForm(isEnabled: boolean){
    return function(target: any, key: string){
      Reflect.defineMetadata("enableDeleteForm",isEnabled,target,key)
    }
  }
  public static isEnabledDeleteForm(target: any,key: string): boolean{
    return Reflect.getMetadata("enableDeleteForm",target,key) === true
  }
}
export function label(label: string) {
  return function (target: any, key: string) {
    // Thêm metadata (nhãn) sử dụng Reflect
    Reflect.defineMetadata('label', label, target, key)
  }
}

/**
 * Determines which property is allowed to display on the form
 * @param isEnabled 
 * @returns 
 */
export function disabledInputForm(isEnabled: boolean){
  return function (target: any,key: string){
    Reflect.defineMetadata("isEnabled",isEnabled,target,key)
  }
}
// Đọc nhãn từ metadata
export function getLabel(target: any, key: string): string {
  return Reflect.getMetadata('label', target, key)
}
export function isEnabled(target: any,key: string): boolean{
  return Reflect.getMetadata('enabled',target,key)
}
export function getMetadata(metadataKey: any,target: any, key: string): any{
  return Reflect.getMetadata(metadataKey,target,key)
}