import {
  mdiAlertOutline,
  mdiInformationOutline,
  mdiMessageAlertOutline,
  mdiCheckboxMarkedCircleOutline
} from "@mdi/js";

// Типы предупреждений
export enum UIAlertTypes {
  Warning = "warning",
  Error = "error",
  Info = "info",
  Success = "success"
}

// Предупреждения для пользователя
export class UIAlert {
  // Тип предупреждения
  type: UIAlertTypes;

  // Текст предупреждения
  message: string;

  constructor(type: UIAlertTypes, message: string) {
    this.type = type;
    this.message = message;
  }

  /**
   * Иконка предупреждения
   */
  get icon(): string {
    switch (this.type) {
      case UIAlertTypes.Info:
        return mdiInformationOutline;
      case UIAlertTypes.Warning:
        return mdiMessageAlertOutline;
      case UIAlertTypes.Error:
        return mdiAlertOutline;
      case UIAlertTypes.Success:
        return mdiCheckboxMarkedCircleOutline;
      default:
        return mdiAlertOutline;
    }
  }
}
