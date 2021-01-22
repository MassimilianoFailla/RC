import { Actions } from "./Actions";
import { ButtonsConfig } from "./ButtonsConfig";
import { MyHeaders } from "./MyHeaders";
import { Orders } from "./Orders";
import { Paginations } from "./Paginations";
import { Search } from "./Search";

export class TablesConfig{

  // headers tabelle
  headers: MyHeaders[];

  // dati tabelle
  data: any;

  // ordine
  order: Orders;

  // ricerca
  search: Search;

  // pagination
  pagination: Paginations;

  // button
  // button: ButtonsConfig;

}
