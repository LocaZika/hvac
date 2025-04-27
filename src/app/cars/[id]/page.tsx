import Breadcrumb from "@components/breadcrumb/Breadcrumb";
import { sendRequest } from "@utils/api.utils";
import { transformString } from "@utils/string.utils";
import { ResolvingMetadata, Metadata } from "next";
import carDetailPageStyle from "./carDetailPage.module.scss";
import { Container, Grid } from "@mui/material";
import Carousel from "@components/carousel/Carousel";
import Image from "next/image";
import { getCurrentDate } from "@utils/date.utils";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCreditCard } from "@fortawesome/free-regular-svg-icons";
import { TCarItemDetail, TCarItemMinData } from "@/types/server";

type Props = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const id = (await params).id;
  const res = await sendRequest<IBackendResponse<TCarItemMinData>>({
    url: `/products/${id}`,
  });
  const { name, imgs, tradeType } = res.data;
  const url = `${process.env.NEXT_PUBLIC_URL}/products/${id}`;
  const transformProductName = transformString(name, "capitalize");
  return {
    title: transformProductName,
    description:
      tradeType === "rent"
        ? `rent ${transformProductName}`
        : `buy ${transformProductName}`,
    openGraph: {
      title: transformProductName,
      description:
        tradeType === "rent"
          ? `rent ${transformProductName}`
          : `buy ${transformProductName}`,
      url,
      siteName: "HVAC Company",
      images: [
        {
          url: `/imgs/cars/${imgs[0].path}`,
          alt: `${transformProductName} image`,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const res = await sendRequest<IBackendResponse<TCarItemDetail>>({
    url: `/products/${id}`,
  });
  const { name, price, discount, vin, stock, detailImgs, imgs, tradeType } =
    res.data;
  return (
    <>
      <Breadcrumb
        items={[{ title: "car list", path: "cars" }, { title: name }]}
      />
      <section className={`${carDetailPageStyle["car-detail"]} spad`}>
        <Container>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={9}>
              <div className={carDetailPageStyle["car-detail__pics"]}>
                <Carousel
                  items={imgs}
                  thumbnail
                  speed={2500}
                  autoplay={false}
                />
              </div>
              <div className={carDetailPageStyle["car-detail__info"]}>
                <h3>Car Infomation</h3>
                {detailImgs.map((img) => (
                  <div
                    key={img.id}
                    className={carDetailPageStyle["car-detail__info__item"]}
                  >
                    <Image
                      src={`/imgs/cars/${img.path}`}
                      alt={"detail image"}
                      priority
                      fill
                      sizes="100vw"
                    />
                  </div>
                ))}
              </div>
            </Grid>
            <Grid item xs={12} lg={3}>
              <div className={carDetailPageStyle["car-detail__sidebar"]}>
                <div
                  className={carDetailPageStyle["car-detail__sidebar__model"]}
                >
                  <ul>
                    <li>
                      stock <span>{stock}</span>
                    </li>
                    <li>
                      vin <span>{vin}</span>
                    </li>
                  </ul>
                  <p>pricing in {getCurrentDate("fullDate")}</p>
                </div>
                <div
                  className={
                    carDetailPageStyle["car-detail__sidebar__trade-type"]
                  }
                >
                  <p>for {tradeType}</p>
                </div>
                <div
                  className={carDetailPageStyle["car-detail__sidebar__payment"]}
                >
                  <ul>
                    <li>
                      msrp <span>${price}</span>
                    </li>
                    <li>
                      dealer discount <span>${discount}</span>
                    </li>
                    <li>
                      price <span>${price - discount}</span>
                    </li>
                  </ul>
                  <Link href={"/contact"}>
                    <FontAwesomeIcon icon={faCreditCard} />
                    contact us
                  </Link>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
