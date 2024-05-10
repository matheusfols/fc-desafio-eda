import Id from "../../../@shared/value-object/id.value-object"

export interface ClientEntityProps {
	id?: Id
	name: string
	email: string
	createdAt?: Date
	updatedAt?: Date
}