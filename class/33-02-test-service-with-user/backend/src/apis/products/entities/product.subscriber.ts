import { EventSubscriber, EntitySubscriberInterface, Connection, InsertEvent, UpdateEvent } from "typeorm";
import { Product } from "./product.entity";
import { BigQuery } from '@google-cloud/bigquery'
import 'dotenv/config'

@EventSubscriber()
export class ProductSubscriber implements EntitySubscriberInterface <Product> {
    constructor (connection: Connection){
    connection.subscribers.push(this)
    }



    listenTo(){
        return Product
    }
       

    afterInsert(event: InsertEvent<Product>): void | Promise<any> {
        console.log(event);
        const bigQuery = new BigQuery({
            keyFilename: process.env.gcp_bigquery_keyfile,
            projectId: process.env.gcp_projectID,
        })


        bigQuery.dataset("mybigquery03").table("productlog").insert([
            {
                id:  event.entity.id,
                name: event.entity.name,
                description: event.entity.description,
                price: event.entity.price,
                isSoldout: event.entity.isSoldout
            }
        ])

        // event.entity.id
        // event.entity.name
        // event.entity.description
        // event.entity.price
        // event.entity.isSoldout
    }
}