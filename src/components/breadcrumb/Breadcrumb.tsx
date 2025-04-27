import { Container, Grid } from '@mui/material';
import breadcrumbStyle from './breadcrumb.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseChimney, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { typeOf } from '@utils/typeOf.utils';
import { isValidTypesArray, TArrayItemsType } from '@utils/validator.utils';

export interface IBreadcrumbItem {
  title: string;
  path?: string;
}
interface IBreadcrumb{
  items: string | string[] | IBreadcrumbItem[];
}
export default function Breadcrumb({items}: IBreadcrumb) {
  let component = null;
  const isString: boolean = typeOf(items) === 'string';
  const isStringArray = (): boolean => {
    if (Array.isArray(items)) {
      const arrItems = items as string[] ?? [];
      const isStringItems = arrItems.every(item => typeOf(item) === 'string');
      return isStringItems;
    }
    return false;
  };
  const isBreadcrumbItems = (): boolean => {
    const typeBreadcrumbItems: TArrayItemsType = [
      { key: 'title', type: 'string' },
      { key: 'path', type: 'string', required: false },
    ];
    return isValidTypesArray(items as any[], typeBreadcrumbItems);
  }
  const stringItem = (): JSX.Element => {
    return (
      <div className={`${breadcrumbStyle['container']} set-bg`}>
      <Container>
        <Grid container>
          <Grid item xs={12} sx={{textAlign: 'center'}}>
            <div className={breadcrumbStyle['text']}>
              <h1>{items as string}</h1>
              <div className={breadcrumbStyle['link']}>
                <Link href={'/'}>
                  <FontAwesomeIcon icon={faHouseChimney} />
                  home
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                <span>{items as string}</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
    );
  };
  const stringItemsArray = (): JSX.Element => {
    return (
      <div className={`${breadcrumbStyle['container']} set-bg`}>
      <Container>
        <Grid container>
          <Grid item xs={12} sx={{textAlign: 'center'}}>
            <div className={breadcrumbStyle['text']}>
              <h1>{items[items.length - 1] as string}</h1>
              <div className={breadcrumbStyle['link']}>
                <Link href={'/'}>
                  <FontAwesomeIcon icon={faHouseChimney} />
                  home
                  <FontAwesomeIcon icon={faChevronRight} />
                </Link>
                {
                  Array.isArray(items) ? (
                    items.map((item, index) => (
                      index < items.length - 1 ? (
                        <Link key={index} href={`/${item}`}>
                          {item as string}
                          {index < items.length - 1 && <FontAwesomeIcon icon={faChevronRight} />}
                        </Link>
                      ) : null
                    ))
                  ) : null
                }
                <span>{items[items.length - 1] as string}</span>
              </div>
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
    );
  };
  const breadcrumbItemArray = (): JSX.Element => {
    const breadcrumbItems = items as IBreadcrumbItem[];
    return (
      <div className={`${breadcrumbStyle['container']} set-bg`}>
        <Container>
          <Grid container>
            <Grid item xs={12} sx={{textAlign: 'center'}}>
              <div className={breadcrumbStyle['text']}>
                <h1>{breadcrumbItems[items.length - 1].title}</h1>
                <div className={breadcrumbStyle['link']}>
                  <Link href={'/'}>
                    <FontAwesomeIcon icon={faHouseChimney} />
                    home
                    <FontAwesomeIcon icon={faChevronRight} />
                  </Link>
                  {
                    Array.isArray(items) ? (
                      breadcrumbItems.map((item, index) => (
                        index < items.length - 1 ? (
                          <Link key={index} href={`/${item.path}`}>
                            {item.title}
                            {index < items.length - 1 && <FontAwesomeIcon icon={faChevronRight} />}
                          </Link>
                        ) : null
                      ))
                    ) : null
                  }
                  <span>{breadcrumbItems[items.length - 1].title}</span>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    );
  };
  if (isString) component = stringItem();
  if (isStringArray()) component = stringItemsArray();
  if (isBreadcrumbItems()) component = breadcrumbItemArray();
  return component;
}
