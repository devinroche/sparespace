import React from "react"
import { Image } from "cloudinary-react"
import { Link } from "react-router-dom"
import {ListingPrice, ListingCardTitle, CardHost} from "../Styles";

export class ListingCard extends React.Component {
    render() {
        let l = this.props.listing;

        return (
            <div className="col-sm-5" style={{boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)", margin: 30}}>
                <Link to={{
                    pathname: `/listing/${l._id}`,
                    state: {
                        listing: l
                    }
                }}>
                <Image cloudName="dopxmkhbr" publicId={l.images[0]} style={styles.imageSize}/>
                    <div className="row">
                        <div className="col-sm-2" style={{paddingRight: 0}}>
                            <ListingPrice>${l.price}</ListingPrice>
                        </div>
                        <div className="col-sm-10" style={{paddingRight: 0, paddingLeft: 10}}>
                            <ListingCardTitle>{l.title}</ListingCardTitle>
                        </div>
                    </div>
                    <div className="row">
                        <CardHost>{l.size}</CardHost>
                    </div>
                </Link>
            </div>

        )
    }
}

export default ListingCard;

const styles = {

    imageSize: {
        width: "100%",
        height: 200,
        marginTop: 10,
    }
};