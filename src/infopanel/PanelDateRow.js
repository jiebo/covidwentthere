import {Grid} from "@material-ui/core";

export default function PanelDateRow(params) {

    let borderTopStyle = params.data?.date != null
    return (
        <Grid container direction={"row"}
              style={borderTopStyle ? {borderTop: "0.1em solid rgba(0, 0, 0, 0.3)"} : {}}>
            <Grid item xs={3}>
                <h5 style={{margin: "4px"}}>{params.data?.date}</h5>
            </Grid>
            <Grid item xs={4}>
                <h5 style={{margin: "4px"}}>{params.data?.time}</h5>
            </Grid>
            <Grid item xs={5}>
                <h5 style={{margin: "4px", fontWeight: "normal"}}>{params.data?.merchant}</h5>
            </Grid>
        </Grid>
    )
}