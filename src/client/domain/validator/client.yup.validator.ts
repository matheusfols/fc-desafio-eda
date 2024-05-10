import * as yup from "yup";
import ValidatorInterface from "../../../@shared/validator/validator.interface";
import ClientEntity from "../entity/client.entity";

export default class ClientYupValidator
  implements ValidatorInterface<ClientEntity> {
  validate(entity: ClientEntity): void {
    try {
      yup
        .object()
        .shape({
          name: yup.string().required("Name is required"),
          email: yup.string().email().required("Email is required"),
        })
        .validateSync(
          {
            id: entity.id,
            name: entity.name,
            email: entity.email,
          },
          {
            abortEarly: false,
          }
        );
    } catch (errors) {
      const e = errors as yup.ValidationError;
      e.errors.forEach((error) => {
        entity.notification.addError({
          context: "client",
          message: error,
        });
      });
    }
  }
}
