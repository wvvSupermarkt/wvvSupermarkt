import mysql from 'promise-mysql';
import * as interfaces from "./interfaces";
export async function getCapacityOfSupermarket(place_id: string,connection:mysql.Connection): Promise<number> {
    
    var sql='select occupancy FROM supermarket WHERE place_id = ?;'
    var rows= await connection.query( sql,[place_id]);
    
    if(rows===undefined){
      return rows
    }
    if(rows.length==0){
        return -1
    }
    
    return rows[0].occupancy 
  }
  export async function getMissingArticles(place_id: string,connection:mysql.Connection): Promise<interfaces.Article[]> {
     
    var sql='select name, hash, availability, lastupdate FROM article INNER JOIN supermarket_article ON article.article_id = supermarket_article.article_id WHERE supermarket_article.place_id=?;';
    var rows= await connection.query( sql,[place_id]);
  
    if(rows===undefined){
      return rows
    }
    var articles: interfaces.Article[]=[]
   for (const row of rows) {
     articles.push({
       name:row.name,
       hash:row.hash,
       availability:row.availability,
       lastupdate:row.lastupdate
     })
   }
   
    return articles
  }
  export async function creatDB(){
      return mysql.createConnection({
    host: 'pc',
    user: 'philipp',
    password: 'phipi-a@2',
    database: "dbo"

  });
}