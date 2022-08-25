import { BasicDbObject } from "./BasicDbObject";
import { ObjectId } from "./ObjectId";

export class DocumentModel{
    filename: String;
	length: number;
	chunkSize: number;
	uploadDate: Date;
	id: ObjectId = new ObjectId();
	metadata: BasicDbObject  = new BasicDbObject();
}