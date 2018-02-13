import React from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import {ListingPrice, CardTitle, CardHost} from "../Styles";

export class ListingCard extends React.Component {
    render() {
        let l = this.props.listing;
        return (

            <div className="col-sm-5 col-sm-offset-1" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"}}>
                <Link to={{
                    pathname: `/listing/${l._id}`,
                    state: {
                        listing: l
                    }
                }}>
                <Image cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSize}/>
                    <CardTitle  className="text-left">{l.title}</CardTitle>
                    <CardHost className="text-left">{l._host.first}</CardHost>
                    <ListingPrice className="text-right">${l.price}</ListingPrice>
                </Link>
            </div>

        )
    }
}

export default ListingCard;

const styles = {

    imageSize: {
        maxWidth: "100%",
        maxHeight: "100%",
    }
};