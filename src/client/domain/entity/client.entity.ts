import AggregateRoot from "../../../@shared/entity/aggregate-root.interface";
import BaseEntity from "../../../@shared/entity/entity.abstract";
import NotificationError from "../../../@shared/notification/notification.error";
import ClientValidatorFactory from "../../factory/client.validator.factory";
import { ClientEntityProps } from "./client.interfaces";

class ClientEntity extends BaseEntity implements AggregateRoot {
  constructor(public props: ClientEntityProps) {
    super(props.id, props.createdAt, props.updatedAt);
    this.props.name = props.name;
    this.props.email = props.email;

    this.validate();
    if (this.notification.hasErrors()) {
      throw new NotificationError(this.notification.getErrors());
    }
  }

  validate() {
    ClientValidatorFactory.create().validate(this);
  }

  get name() {
    return this.props.name;
  }

  get email() {
    return this.props.email;
  }

}

export default ClientEntity;