'use client'
import { Container, Grid } from '@mui/material';
import chooseUsStyle from './chooseUs.module.scss';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faPlay } from '@fortawesome/free-solid-svg-icons';
import ReactPlayer from 'react-player';
import { useState } from 'react';
import Image from 'next/image';

const PlayIcon = () => (
  <div className={chooseUsStyle['play-icon']}>
    <FontAwesomeIcon icon={faPlay} />
  </div>
)

export default function ChooseUs({data}: {data: TChooseUs}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const handlePlay = (): void => {
    setIsPlaying(true);
  }
  const handlePause = (): void => {
    setIsPlaying(false);
  }
  return (
    <section className={`${chooseUsStyle['container']} spad`}>
      <Container>
        <Grid container>
          <Grid item lg={5}>
            <div className={chooseUsStyle['text']}>
              <div className='section-title'>
                <h2>{data.title}</h2>
                <p>{data.text}</p>
              </div>
              <ul>
                {
                  data.items.map(({id, text}) => (
                    <li key={id}>
                      <FontAwesomeIcon icon={faCircleCheck} />
                      {text}
                    </li>
                  ))
                }
              </ul>
              <Link href={'/about'}>about us</Link>
            </div>
          </Grid>
        </Grid>
      </Container>
      <div className={!isPlaying ? chooseUsStyle['video'] : `${chooseUsStyle['video']} ${chooseUsStyle['playing']}`}>
        <ReactPlayer
          url={data.videoUrl}
          light={
            <Image
              src={'/imgs/chooseUs/video-thumbnail.jpg'}
              alt='video thumbnail'
              priority
              fill
              sizes='100%'
            />
          }
          onPlay={handlePlay}
          onPause={handlePause}
          style={{height: '100%'}}
          width={'100%'}
          height={'100%'}
          playIcon={<PlayIcon />}
        />
      </div>
    </section>
  )
}
