import React from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import {ListingPrice, CardTitle, CardHost} from "../Styles";

export class ListingCard extends React.Component {
    render() {
        let l = this.props.listing;
        return (

            <div className="col-sm-5 col-sm-offset-1" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", marginBottom: 25, marginTop: 25}}>
                <Link to={{
                    pathname: `/listing/${l._id}`,
                    state: {
                        listing: l
                    }
                }}>
                <Image cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSizev2}/>
                    <div className="row">
                        <div className="col-sm-8">
                            <CardTitle style={{fontSize: 20}}  className="">{l.title}</CardTitle>
                            <CardHost className="">{l._host.first}</CardHost>
                        </div>
                        <div className="col-sm-4">
                            <ListingPrice className="">${l.price}</ListingPrice>
                        </div>
                    </div>
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
    },

    imageSizev2 : {
        width: 300,
        height: 250
    }
};