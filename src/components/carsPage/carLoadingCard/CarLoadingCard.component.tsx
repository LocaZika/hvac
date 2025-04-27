import { Card, CardActionArea, CardContent, CardMedia, Skeleton } from "@mui/material";

export default function CarLoadingCard() {
  return (
    <Card>
      <CardActionArea>
        <CardMedia>
          <Skeleton variant="rounded" animation="wave" width={265} height={150} />
        </CardMedia>
        <CardContent>
          <div style={{paddingLeft: '2rem'}}>
            <Skeleton variant="text" animation="wave" width={62} height={22} />
            <Skeleton variant="text" animation="wave" width={'100%'} height={22} />
            <Skeleton variant="text" animation="wave" width={'100%'} height={18} />
            <Skeleton variant="text" animation="wave" width={'100%'} height={47} />
          </div>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}
