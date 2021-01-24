import React from "react";
import { Link } from "react-router-dom";
import './catalogue.css';

export default function Catalogue(props:{
    catalogueArr: {
        path: string;
        name: string;
    }[]
}) {
    return (
        <div className="catalogue">
            {props.catalogueArr.map(item => {
                return <Link key={item.name} to={item.path}><div >{item.name}</div></Link>;
            })}
        </div>
    )
} 