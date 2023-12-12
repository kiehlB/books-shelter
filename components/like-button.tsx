'use client';

import React, { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { useDebounce, useDebouncedCallback } from 'use-debounce';
import styled, { keyframes, css } from 'styled-components';
import clsx from 'clsx';
import { toast } from 'react-toastify';
import usePostLike from '@/views/post/hooks/use-post-like';
import useCoreStore from '@/store/core';

export type PostProps = {
  id: string;
  auth: any;
};

export default function PawButton({ id, auth }: PostProps) {
  const { isdark } = useCoreStore();
  const { data, onLikeToggle } = usePostLike(id, auth);

  let confettiAmount = 60;

  const confettiColors = [
    '#7d32f5',
    '#f6e434',
    '#63fdf1',
    '#e672da',
    '#295dfe',
    '#6e57ff',
  ];

  const random = (min: number, max: number): any => {
    return Math.floor(Math.random() * (max - min + 1) + min);
  };

  const createConfetti = (to: { appendChild: (arg0: HTMLElement) => void }) => {
    let elem = document.createElement('i'),
      set = Math.random() < 0.5 ? -1 : 1;
    elem.style.setProperty('--x', random(-260, 260) + 'px');
    elem.style.setProperty('--y', random(-160, 160) + 'px');
    elem.style.setProperty('--r', random(0, 360) + 'deg');
    elem.style.setProperty('--s', random(0.6, 1));
    elem.style.setProperty('--b', confettiColors[random(0, 5)]);
    to.appendChild(elem);
  };

  useEffect(() => {
    document.querySelectorAll('.paw-button').forEach((elem: any) => {
      if (data?.post?.liked) {
        elem.classList.add('animation2');
        elem.classList.add('confetti2');
        elem.classList.add('liked2');
      } else {
        elem.classList.remove('animation2', 'liked2', 'confetti2');
      }
    });
  }, [data?.post?.liked]);

  const a = (e: { preventDefault: () => void }) => {
    if (!auth) {
      toast.error('로그인 후 이용해주세요.', {
        position: 'bottom-right',
      });
      return;
    }
    document.querySelectorAll('.paw-button').forEach((elem: any) => {
      if (!data?.post?.liked) {
        elem.classList.add('animation');
        for (let i = 0; i < confettiAmount; i++) {
          createConfetti(elem);
        }
        setTimeout(() => {
          elem.classList.add('confetti');
          setTimeout(() => {
            elem.classList.add('liked');
          }, 200);
          setTimeout(() => {
            elem.querySelectorAll('i').forEach((i: { remove: () => any }) => i.remove());
          }, 200);
        }, 260);
      } else {
        elem.classList.remove('animation', 'liked', 'confetti');
      }
      e.preventDefault();
    });
  };

  const isLogin = auth ? 500 : 0;

  const debounced = useDebouncedCallback(e => {
    a(e);
    onLikeToggle();
  }, isLogin);

  return (
    <>
      <div onClick={debounced}>
        <Paw className={clsx('paw-button')} $isLike={data?.post?.liked!} $isdark={isdark}>
          <div className="text">
            <svg>
              <use xlinkHref="#heart"></use>
            </svg>
          </div>
          <div className="z-40 text-[#212529] dark:text-[#fff]">{data?.post?.likes}</div>
          <div className="paws">
            <svg className="paw">
              <use xlinkHref="#paw"></use>
            </svg>
            <div className="paw-effect">
              <div />
            </div>
            <svg className="paw-clap">
              <use xlinkHref="#paw-clap"></use>
            </svg>
          </div>
        </Paw>
        {/* Symbols */}
        <svg xmlns="http://www.w3.org/2000/svg" style={{ display: 'none' }}>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 21 19" id="heart">
            <path
              d="M10.7146252,2.79863032 C12.7012563,0.931232655 14.9323041,0.436636741 17.303155,1.3849771 C20.1742369,2.53340984 21.379939,5.46245395 20.2209696,8.35987762 C19.6094364,9.88871051 17.374953,12.5020804 13.4593886,16.3167815 L12.4216841,17.3182725 C11.3603119,18.3334838 9.68851069,18.3354777 8.62471989,17.322801 L7.91413528,16.6420566 C3.86646758,12.738617 1.52252172,10.0157042 0.832966246,8.37137962 C-0.41863058,5.38680258 0.803066105,2.56217827 3.74606902,1.3849771 C5.99801057,0.484200479 8.20491678,0.982789394 10.280801,2.80379411 L10.5027119,3.00395851 L10.7146252,2.79863032 Z"
              fill="var(--border)"
            />
            <path
              d="M16.746069,2.77769213 C14.6991759,1.9589349 12.8646007,2.52341959 11.0917453,4.57210939 L10.5493822,5.19885746 L9.97978137,4.59675633 C8.07203164,2.58015418 6.22092676,2.01058345 4.30315504,2.77769213 C2.13116413,3.6464885 1.29186971,5.5869795 2.21625782,7.79128961 C2.80060177,9.18472518 5.06951474,11.8148892 8.97366525,15.5798429 L9.65895765,16.2363608 C10.142501,16.6966703 10.9024138,16.695764 11.3840599,16.2350667 L12.3934356,15.260969 L13.3524601,14.3169524 C16.5267562,11.1578139 18.3665388,8.9570809 18.8282545,7.80279161 C19.6830863,5.66571221 18.8388588,3.61480804 16.746069,2.77769213 Z"
              fill="var(--background)"
            />
            <path
              d="M11.2640718,4.39338901 L11.1990259,4.45003381 C12.9386445,2.50122541 14.7404343,1.97543825 16.746069,2.77769213 C18.8388588,3.61480804 19.6830863,5.66571221 18.8282545,7.80279161 C18.3963269,8.88261062 17.6718097,9.565648 18.0773108,8.55189509 C18.9321426,6.41481569 18.0879151,4.36391153 15.9951253,3.52679561 C14.3011449,2.84920342 12.7525807,3.11899214 11.2640718,4.39338901 L11.1990259,4.45003381 L11.2640718,4.39338901 Z"
              fill="var(--shadow-light)"
            />
            <path
              d="M4.30315504,2.77769213 C5.1840079,2.42535099 6.05079631,2.35500405 6.91546905,2.57734431 C6.71200283,2.6290933 6.50795909,2.69577051 6.30315504,2.77769213 C4.13116413,3.6464885 3.29186971,5.5869795 4.21625782,7.79128961 C4.80060177,9.18472518 7.06951474,11.8148892 10.9736653,15.5798429 L11.5197324,16.1027938 L11.3840599,16.2350667 C10.9368171,16.6628571 10.2496402,16.694195 9.76660209,16.3279397 L9.65895765,16.2363608 L8.97366525,15.5798429 L8.30168234,14.9272399 C4.80841276,11.5097375 2.7662286,9.10275838 2.21625782,7.79128961 C1.29186971,5.5869795 2.13116413,3.6464885 4.30315504,2.77769213 Z"
              fill="var(--shadow-dark)"
            />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 37" id="paw">
            <path
              d="M29.5,13.1428571 C29.5,10.2731801 27.9339013,8.22572388 24.9356506,7.09074873 C24.5060635,4.10962466 23.2255501,2.04210672 21.0854102,0.97203675 C18.9713961,-0.0849702928 16.8221988,0.0215138899 14.726671,1.27088412 C12.9760568,0.361959777 11.0555026,0.250453528 9.01282918,0.931344669 C6.80047326,1.66879664 5.34226875,3.75843749 4.59894815,7.09619125 C1.88946192,8.25783275 0.5,10.4828381 0.5,13.6428571 C0.5,16.7274666 1.50305875,19.3423638 3.5,21.4476618 L3.5,37 L5,37 L26,37 L26,21.4218665 C28.3223642,18.6969403 29.5,15.9336988 29.5,13.1428571 Z"
              fill="var(--paw-background)"
            />
            <path
              d="M12.5510071,2.08359581 L12.3699777,2.11684999 C12.080837,2.17532308 11.7866606,2.25446 11.4871708,2.35428994 C9.84726969,2.90092365 8.68967842,4.56898134 8.05392526,7.46323001 L7.98543551,7.78986457 L7.90367876,8.19864828 L7.51334258,8.34502435 C5.14457644,9.23331165 4,10.9501763 4,13.6427775 C4,16.3251292 4.84482735,18.5538216 6.54341216,20.3676718 L6.78033009,20.6124474 L7,20.8321173 L7,37 L5,37 L5,20.8321173 L4.78033009,20.6124474 C2.92337534,18.7554926 2,16.4470543 2,13.6427775 C2,10.9501763 3.14457644,9.23331165 5.51334258,8.34502435 L5.90367876,8.19864828 L5.98543551,7.78986457 C6.60459253,4.69407947 7.78653261,2.92116934 9.48717082,2.35428994 C10.5739986,1.99201401 11.5908529,1.90224716 12.5510071,2.08359581 Z"
              fill="var(--paw-shadow)"
            />
            <path
              d="M14.726671,1.27088412 C16.8221988,0.0215138899 18.9713961,-0.0849702928 21.0854102,0.97203675 C23.2255501,2.04210672 24.5060635,4.10962466 24.9356506,7.09074873 C27.9339013,8.22572388 29.5,10.2731801 29.5,13.1428571 C29.5,15.9336988 28.3223642,18.6969403 26,21.4218665 L26,21.4218665 L26,37 L24.5,37 L24.5,20.8610558 L24.9573772,20.3318354 C26.9962284,17.9020144 28,15.5090865 28,13.1428571 C28,10.8190336 26.722442,9.2575739 24.0128292,8.35436962 L24.0128292,8.35436962 L23.5575804,8.20262004 L23.5045872,7.72568079 C23.1972701,4.95982682 22.1638979,3.18833157 20.4145898,2.31367754 C18.6608767,1.43682096 16.9468873,1.57965341 15.1660251,2.76689486 L15.1660251,2.76689486 L14.7711145,3.03016863 L14.3641282,2.78597684 C12.8897645,1.90135863 11.2841096,1.75539001 9.48717082,2.35436962 C7.78653261,2.92124902 6.60459253,4.69415915 5.98543551,7.78994424 L5.98543551,7.78994424 L5.90367876,8.19872796 L5.51334258,8.34510403 C3.14457644,9.23339133 2,10.950256 2,13.6428571 C2,16.447134 2.92337534,18.7555723 4.78033009,20.6125271 L4.78033009,20.6125271 L5,20.832197 L5,37 L3.5,37 L3.5,21.4476618 C1.50305875,19.3423638 0.5,16.7274666 0.5,13.6428571 C0.5,10.4828381 1.88946192,8.25783275 4.59894815,7.09619125 C5.34226875,3.75843749 6.80047326,1.66879664 9.01282918,0.931344669 C11.0555026,0.250453528 12.9760568,0.361959777 14.726671,1.27088412 Z M16.638062,12.5195284 L16.9751913,12.7601688 C18.0967789,13.5694838 18.9749332,14.293632 19.612949,14.9387355 L20.4989182,15.8729074 L20.7275495,16.1198892 C22.287511,17.8257331 23,19.06095 23,20.6428571 C23,22.748712 21.7937122,24.2093565 20.0022523,24.8491636 C18.9997434,25.2072025 17.5693092,24.7939391 15.5897122,23.7023129 C15.4916937,23.6482617 15.3696945,23.6659395 15.2777616,23.7587157 L15.0962469,23.9332613 C14.0702327,24.8715531 12.8663041,25.1950155 11.5680983,24.870464 C9.23960588,24.2883409 8,22.8481455 8,20.6428571 C8,19.4464248 8.41219153,18.5150362 9.30032474,17.3580767 L9.49794706,17.1065253 L10.4509499,15.9471049 L10.8327975,15.4568873 L11.2281207,14.9649287 C11.5787918,14.5376029 11.9825802,14.0668257 12.4397068,13.5522181 L13.013875,12.9136261 C13.9478461,11.8864129 15.5009892,11.7164518 16.638062,12.5195284 Z M14.2188164,13.8286484 L14.1237093,13.9227187 L13.565323,14.5437006 L13.0582509,15.1219097 C12.6570954,15.5858882 12.3094806,16.0051601 12.0156272,16.3793463 L11.6250373,16.880668 C11.5474831,16.9778167 11.4648982,17.0794322 11.3741223,17.1896922 L10.7635094,17.9277201 L10.497234,18.2622383 C9.79053097,19.1808965 9.5,19.8386072 9.5,20.6428571 C9.5,22.1284827 10.2444388,22.9933845 11.9319017,23.4152503 C12.7338477,23.6157368 13.4233225,23.4304939 14.0697076,22.8397189 L14.2236793,22.6916816 C14.7741221,22.1342076 15.628003,22.0104801 16.3140407,22.3887878 C17.9353381,23.2828338 19.0369863,23.6011084 19.4977477,23.4365507 C20.7300594,22.9964394 21.5,22.0641498 21.5,20.6428571 C21.5,19.5464758 20.9372875,18.5728913 19.6185239,17.1299681 L19.4039869,16.8981515 L18.5391359,15.986118 C17.9689582,15.4108027 17.1542319,14.739096 16.1006156,13.9788165 L15.769682,13.7425992 C15.2910354,13.4045518 14.6481234,13.4470184 14.2188164,13.8286484 Z M6.25,10.6428571 C7.90685425,10.6428571 9.25,12.2098605 9.25,14.1428571 C9.25,16.0758538 7.90685425,17.6428571 6.25,17.6428571 C4.59314575,17.6428571 3.25,16.0758538 3.25,14.1428571 C3.25,12.2098605 4.59314575,10.6428571 6.25,10.6428571 Z M23.25,9.64285714 C24.9068542,9.64285714 26.25,11.2098605 26.25,13.1428571 C26.25,15.0758538 24.9068542,16.6428571 23.25,16.6428571 C21.5931458,16.6428571 20.25,15.0758538 20.25,13.1428571 C20.25,11.2098605 21.5931458,9.64285714 23.25,9.64285714 Z M6.25,12.1428571 C5.47730131,12.1428571 4.75,12.9913753 4.75,14.1428571 C4.75,15.2943389 5.47730131,16.1428571 6.25,16.1428571 C7.02269869,16.1428571 7.75,15.2943389 7.75,14.1428571 C7.75,12.9913753 7.02269869,12.1428571 6.25,12.1428571 Z M23.25,11.1428571 C22.4773013,11.1428571 21.75,11.9913753 21.75,13.1428571 C21.75,14.2943389 22.4773013,15.1428571 23.25,15.1428571 C24.0226987,15.1428571 24.75,14.2943389 24.75,13.1428571 C24.75,11.9913753 24.0226987,11.1428571 23.25,11.1428571 Z M18.25,3.64285714 C19.9068542,3.64285714 21.25,5.20986052 21.25,7.14285714 C21.25,9.07585377 19.9068542,10.6428571 18.25,10.6428571 C16.5931458,10.6428571 15.25,9.07585377 15.25,7.14285714 C15.25,5.20986052 16.5931458,3.64285714 18.25,3.64285714 Z M11.25,3.64285714 C12.9068542,3.64285714 14.25,5.20986052 14.25,7.14285714 C14.25,9.07585377 12.9068542,10.6428571 11.25,10.6428571 C9.59314575,10.6428571 8.25,9.07585377 8.25,7.14285714 C8.25,5.20986052 9.59314575,3.64285714 11.25,3.64285714 Z M18.25,5.14285714 C17.4773013,5.14285714 16.75,5.99137534 16.75,7.14285714 C16.75,8.29433895 17.4773013,9.14285714 18.25,9.14285714 C19.0226987,9.14285714 19.75,8.29433895 19.75,7.14285714 C19.75,5.99137534 19.0226987,5.14285714 18.25,5.14285714 Z M11.25,5.14285714 C10.4773013,5.14285714 9.75,5.99137534 9.75,7.14285714 C9.75,8.29433895 10.4773013,9.14285714 11.25,9.14285714 C12.0226987,9.14285714 12.75,8.29433895 12.75,7.14285714 C12.75,5.99137534 12.0226987,5.14285714 11.25,5.14285714 Z"
              fill="var(--paw-border)"
            />
            <path
              d="M14.2188164,13.8286484 C14.6481234,13.4470184 15.2910354,13.4045518 15.769682,13.7425992 L15.769682,13.7425992 L16.1006156,13.9788165 C17.1542319,14.739096 17.9689582,15.4108027 18.5391359,15.986118 L18.5391359,15.986118 L19.4039869,16.8981515 L19.6185239,17.1299681 C20.9372875,18.5728913 21.5,19.5464758 21.5,20.6428571 C21.5,22.0641498 20.7300594,22.9964394 19.4977477,23.4365507 C19.0369863,23.6011084 17.9353381,23.2828338 16.3140407,22.3887878 C15.628003,22.0104801 14.7741221,22.1342076 14.2236793,22.6916816 L14.2236793,22.6916816 L14.0697076,22.8397189 C13.4233225,23.4304939 12.7338477,23.6157368 11.9319017,23.4152503 C10.2444388,22.9933845 9.5,22.1284827 9.5,20.6428571 C9.5,19.8386072 9.79053097,19.1808965 10.497234,18.2622383 L10.497234,18.2622383 L10.7635094,17.9277201 L11.3741223,17.1896922 C11.4648982,17.0794322 11.5474831,16.9778167 11.6250373,16.880668 L11.6250373,16.880668 L12.0156272,16.3793463 C12.3094806,16.0051601 12.6570954,15.5858882 13.0582509,15.1219097 L13.0582509,15.1219097 L13.565323,14.5437006 L14.1237093,13.9227187 Z M6.25,12.1428571 C7.07842712,12.1428571 7.75,13.0382876 7.75,14.1428571 C7.75,15.2474266 7.07842712,16.1428571 6.25,16.1428571 C5.42157288,16.1428571 4.75,15.2474266 4.75,14.1428571 C4.75,13.0382876 5.42157288,12.1428571 6.25,12.1428571 Z M23.25,11.1428571 C24.0784271,11.1428571 24.75,12.0382876 24.75,13.1428571 C24.75,14.2474266 24.0784271,15.1428571 23.25,15.1428571 C22.4215729,15.1428571 21.75,14.2474266 21.75,13.1428571 C21.75,12.0382876 22.4215729,11.1428571 23.25,11.1428571 Z M11.25,5.14285714 C12.0784271,5.14285714 12.75,6.03828764 12.75,7.14285714 C12.75,8.24742664 12.0784271,9.14285714 11.25,9.14285714 C10.4215729,9.14285714 9.75,8.24742664 9.75,7.14285714 C9.75,6.03828764 10.4215729,5.14285714 11.25,5.14285714 Z M18.25,5.14285714 C19.0784271,5.14285714 19.75,6.03828764 19.75,7.14285714 C19.75,8.24742664 19.0784271,9.14285714 18.25,9.14285714 C17.4215729,9.14285714 16.75,8.24742664 16.75,7.14285714 C16.75,6.03828764 17.4215729,5.14285714 18.25,5.14285714 Z"
              fill="var(--paw-inner)"
            />
            <path
              d="M15.6564811,13.6713241 L15.769682,13.7425992 L15.7989878,13.7631232 L15.7188164,13.8286484 L15.6237093,13.9227187 L15.065323,14.5437006 L14.5582509,15.1219097 C14.1570954,15.5858882 13.8094806,16.0051601 13.5156272,16.3793463 L13.1250373,16.880668 L12.8741223,17.1896922 L12.2635094,17.9277201 L11.997234,18.2622383 C11.290531,19.1808965 11,19.8386072 11,20.6428571 C11,22.0705306 11.6874927,22.9249629 13.2387185,23.3638482 C12.8332452,23.5177596 12.4018884,23.5327469 11.9319017,23.4152503 C10.2444388,22.9933845 9.5,22.1284827 9.5,20.6428571 C9.5,19.9004726 9.74755301,19.2829499 10.3414792,18.4697896 L10.497234,18.2622383 L10.7635094,17.9277201 L11.504538,17.0302633 L11.6250373,16.880668 L12.0156272,16.3793463 C12.2507099,16.0799973 12.5201999,15.7517935 12.8239843,15.394929 L13.0582509,15.1219097 L13.565323,14.5437006 L14.1237093,13.9227187 L14.2188164,13.8286484 C14.6150998,13.4763746 15.1933898,13.413092 15.6564811,13.6713241 Z M6.25,12.1428571 C6.33532091,12.1428571 6.41897804,12.1523552 6.50040906,12.1706015 C5.79087888,12.3287352 5.25,13.1515768 5.25,14.1428571 C5.25,15.1341375 5.79087888,15.9569791 6.50060472,16.1153394 C6.41897804,16.1333591 6.33532091,16.1428571 6.25,16.1428571 C5.42157288,16.1428571 4.75,15.2474266 4.75,14.1428571 C4.75,13.0382876 5.42157288,12.1428571 6.25,12.1428571 Z M23.25,11.1428571 C23.3353209,11.1428571 23.418978,11.1523552 23.5004091,11.1706015 C22.7908789,11.3287352 22.25,12.1515768 22.25,13.1428571 C22.25,14.1341375 22.7908789,14.9569791 23.5006047,15.1153394 C23.418978,15.1333591 23.3353209,15.1428571 23.25,15.1428571 C22.4215729,15.1428571 21.75,14.2474266 21.75,13.1428571 C21.75,12.0382876 22.4215729,11.1428571 23.25,11.1428571 Z M11.25,5.14285714 C11.3353209,5.14285714 11.418978,5.15235519 11.5004091,5.17060154 C10.7908789,5.32873521 10.25,6.15157682 10.25,7.14285714 C10.25,8.13413746 10.7908789,8.95697908 11.5006047,9.11533943 C11.418978,9.1333591 11.3353209,9.14285714 11.25,9.14285714 C10.4215729,9.14285714 9.75,8.24742664 9.75,7.14285714 C9.75,6.03828764 10.4215729,5.14285714 11.25,5.14285714 Z M18.25,5.14285714 C18.3353209,5.14285714 18.418978,5.15235519 18.5004091,5.17060154 C17.7908789,5.32873521 17.25,6.15157682 17.25,7.14285714 C17.25,8.13413746 17.7908789,8.95697908 18.5006047,9.11533943 C18.418978,9.1333591 18.3353209,9.14285714 18.25,9.14285714 C17.4215729,9.14285714 16.75,8.24742664 16.75,7.14285714 C16.75,6.03828764 17.4215729,5.14285714 18.25,5.14285714 Z"
              fill="var(--paw-shadow-dark)"
            />
            <path
              d="M18.3607518,15.8106395 L18.5391359,15.986118 L19.4039869,16.8981515 L19.6185239,17.1299681 C20.9372875,18.5728913 21.5,19.5464758 21.5,20.6428571 C21.5,22.0641498 20.7300594,22.9964394 19.4977477,23.4365507 C19.3094393,23.5038037 19.0140855,23.4904106 18.6199622,23.3900272 L18.4977477,23.4365507 C19.7300594,22.9964394 20.5,22.0641498 20.5,20.6428571 C20.5,19.5464758 20.5687636,18.5857803 19.25,17.1428571 C18.2857494,15.8980028 17.9893333,15.4539302 18.3607518,15.8106395 Z"
              fill="var(--paw-shadow-light)"
            />
          </symbol>
          <symbol xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29 34" id="paw-clap">
            <path
              d="M4.5,34 L4.5,20.5024009 L4.28033009,20.282731 C2.42337534,18.4257762 1.5,16.1173379 1.5,13.313061 C1.5,10.6471662 2.60979812,9.12119381 4.93190172,8.54066791 L5.40134193,8.42330786 L5.48790243,7.94722512 C6.11076052,4.52150561 7.30156981,2.58644052 8.98717082,2.02457351 C10.7449132,1.4386594 12.3127354,1.72371798 13.7814787,2.89871265 L14.2596812,3.28127461 L14.7301383,2.889227 C16.5115081,1.40475216 18.1951255,1.12414927 19.9145898,1.98388143 C21.651916,2.85254456 22.6936777,4.78724477 23.0037221,7.88768883 L23.0577045,8.42751297 L23.5873022,8.54520133 C26.260051,9.13914552 27.5,10.5168667 27.5,12.813061 C27.5,15.28217 26.4070465,17.7803495 24.1855675,20.3191826 L24,20.5312597 L24,34 L4.5,34 Z"
              fill="var(--paw-clap-background)"
            />
            <path
              d="M12.146803,1.97288306 L11.9871708,2.02457351 C10.359694,2.56706579 9.19347364,4.38968566 8.55435901,7.59815296 L8.48790243,7.94722512 L8.40134193,8.42330786 L7.93190172,8.54066791 C5.60979812,9.12119381 4.5,10.6471662 4.5,13.313061 C4.5,15.9954128 5.34482735,18.2241051 7.04341216,20.0379554 L7.28033009,20.282731 L7.5,20.5024009 L7.5,34 L4.5,34 L4.5,20.5024009 L4.28033009,20.282731 C2.42337534,18.4257762 1.5,16.1173379 1.5,13.313061 C1.5,10.6471662 2.60979812,9.12119381 4.93190172,8.54066791 L5.40134193,8.42330786 L5.48790243,7.94722512 C6.11076052,4.52150561 7.30156981,2.58644052 8.98717082,2.02457351 C10.1099844,1.65030233 11.1553025,1.63142458 12.146803,1.97288306 Z"
              fill="var(--paw-clap-shadow)"
            />
            <path
              d="M29,12.813061 C29,9.9391533 27.4240531,8.03364289 24.4355571,7.21065466 C24.0076525,3.9347868 22.7345972,1.71683414 20.5854102,0.642240647 C18.464427,-0.418250938 16.3124373,-0.158512501 14.2369156,1.37034347 C12.4952684,0.178909945 10.5640578,-0.0821942985 8.51282918,0.601548566 C6.29105947,1.34213847 4.84205262,3.58191705 4.10108646,7.21697394 C1.39604257,8.06878334 0,10.155857 0,13.313061 C0,16.3976705 1.00305875,19.0125677 3,21.1178657 L3,34 L4.5,34 L4.5,20.5024009 L4.28033009,20.282731 C2.42337534,18.4257762 1.5,16.1173379 1.5,13.313061 C1.5,10.6471662 2.60979812,9.12119381 4.93190172,8.54066791 L5.40134193,8.42330786 L5.48790243,7.94722512 C6.11076052,4.52150561 7.30156981,2.58644052 8.98717082,2.02457351 C10.7449132,1.4386594 12.3127354,1.72371798 13.7814787,2.89871265 L14.2596812,3.28127461 L14.7301383,2.889227 C16.5115081,1.40475216 18.1951255,1.12414927 19.9145898,1.98388143 C21.651916,2.85254456 22.6936777,4.78724477 23.0037221,7.88768883 L23.0577045,8.42751297 L23.5873022,8.54520133 C26.260051,9.13914552 27.5,10.5168667 27.5,12.813061 C27.5,15.28217 26.4070465,17.7803495 24.1855675,20.3191826 L24,20.5312597 L24,34 L25.5,34 L25.5,21.0920704 C27.8223642,18.3671442 29,15.6039027 29,12.813061 Z"
              fill="var(--paw-clap-border)"
            />
          </symbol>
        </svg>
      </div>
    </>
  );
}

const Paw = styled.div<{ $isLike: boolean; $isdark: string }>`
  --background: #fff;
  --background-active: #fee8f4;
  --border: #f1eceb;
  --border-active: #eec2db;
  --text: #000;
  --number: #9c9496;
  --number-active: #000;
  --heart-background: #fff;
  --heart-background-active: #fea5d7;
  --heart-border: #c3c2c0;
  --heart-border-active: #2b2926;
  --heart-shadow-light: #fee0f2;
  --heart-shadow-dark: #ea5daf;
  --paw-background: #fff;
  --paw-border: #201e1b;
  --paw-shadow: #eeeded;
  --paw-inner: var(--heart-background-active);
  --paw-shadow-light: var(--heart-shadow-light);
  --paw-shadow-dark: var(--heart-shadow-dark);
  --paw-clap-background: #fef0a5;
  --paw-clap-border: var(--paw-border);
  --paw-clap-shadow: #fed75c;
  --paw-clap-border: var(--paw-border);
  --circle: #df3dce;
  --circle-line: #000;
  display: inline-flex;
  text-decoration: none;
  font-weight: bold;
  position: relative;
  line-height: 19px;
  padding: 12px 16px;
  &:before {
    content: '';
    position: absolute;
    display: block;
    left: -2px;
    top: -2px;
    bottom: -2px;
    right: -2px;
    z-index: 1;
    border-radius: 5px;
    transition:
      background 0.45s,
      border-color 0.45s;
    border: 2px solid #f1eceb;
    border-radius: 5px;
  }
  svg {
    display: block;
  }
  .text {
    position: relative;
    backface-visibility: hidden;
    transform: translateZ(0);
    z-index: 3;
    margin-right: 8px;
    transition: width 0.25s;
    width: var(--w, 30px);
    span,
    svg {
      transition:
        transform 0.15s ease-out,
        opacity 0.2s;
      opacity: var(--o, 1);
    }
    span {
      display: block;
      position: absolute;
      left: 30px;
      top: 0;
      transform: translateY(var(--y, 0));
      color: var(--text);
    }
    svg {
      --background: var(--heart-background);
      --border: var(--heart-border);
      --shadow-light: transparent;
      --shadow-dark: transparent;
      width: 21px;
      height: 19px;
      transform: translateX(var(--x));
    }
  }
  & > span {
    display: block;
    position: relative;
    backface-visibility: hidden;
    transform: translateZ(0);
    z-index: 2;
    color: var(--number);
  }
  .paws {
    overflow: hidden;
    position: absolute;
    left: -20px;
    right: 0px;
    bottom: 0;
    height: 60px;
    z-index: 2;
    svg {
      position: absolute;
      bottom: 0;
      transition:
        transform 0.3s ease-out,
        opacity 0.2s;
      opacity: var(--o, 0);
      transform: translate(var(--x, 0), var(--y, 0));
      &.paw {
        --x: -24px;
        width: 30px;
        height: 37px;
        left: 32px;
      }
      &.paw-clap {
        --x: 16px;
        --y: 34px;
        --o: 1;
        width: 29px;
        height: 34px;
        left: 34px;
      }
    }
    .paw-effect {
      left: 26px;
      top: 12px;
      width: 44px;
      height: 44px;
      position: absolute;
      &:before {
        content: '';
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background: var(--circle);
        transform: scale(var(--s, 0));
        opacity: var(--o, 1);
        transition:
          transform 0.15s ease 0.16s,
          opacity 0.2s linear 0.25s;
      }
      div {
        width: 2px;
        height: 6px;
        border-radius: 1px;
        left: 50%;
        bottom: 50%;
        margin-left: -1px;
        position: absolute;
        background: var(--circle-line);
        transform: translateY(-24px) scaleX(0.7) scaleY(var(--s, 0));
        &:before,
        &:after {
          content: '';
          display: block;
          position: absolute;
          width: 100%;
          height: 100%;
          background: inherit;
          border-radius: inherit;
          transform: translate(var(--x, -22px), var(--y, 4px)) rotate(var(--r, -45deg))
            scaleX(0.8) scaleY(var(--s, 0));
        }
        &:after {
          --x: 22px;
          --r: 45deg;
        }
      }
      div,
      div:before,
      div:after {
        opacity: var(--o, 1);
        transform-origin: 50% 100%;
        transition:
          transform 0.12s ease 0.17s,
          opacity 0.18s linear 0.21s;
      }
    }
  }
  i {
    position: absolute;
    display: block;
    width: 4px;
    height: 4px;
    top: 50%;
    left: 50%;
    margin: -2px 0 0 -2px;
    opacity: var(--o, 0);
    background: var(--b);
    transform: translate(var(--x), var(--y)) scale(var(--s, 1));
  }
  &:not(.confetti2) {
    &:hover {
      .text {
        --o: 0;
        --y: 8px;
      }
      .paws {
        svg {
          &.paw {
            --o: 1;
            --x: 0;
          }
        }
      }
    }
  }
  &.animation2 {
    .text {
      svg {
        --background: var(--heart-background-active);
        --border: var(--heart-border-active);
        --shadow-light: var(--heart-shadow-light);
        --shadow-dark: var(--heart-shadow-dark);
      }
    }
    /* .paws {
      svg {
        &.paw {
          --x: 0;
          --o: 1;
          transition-delay: 0s;
          animation: paw 0s ease forwards;
        }
        &.paw-clap {
          animation: paw-clap 0s ease-in forwards;
        }
      }
      .paw-effect {
        --s: 1;
        --o: 0;
      }
    } */
  }
  &.confetti2 {
    i {
      animation: confetti 0s ease-out forwards;
    }
    .paws {
      svg {
        &.paw {
          --o: 0;
          transition: opacity 0s linear 0s;
        }
      }
    }
  }
  &.liked2 {
    --background: var(--background-active);
    --border: var(--border-active);
    .text {
      --w: 21px;
      svg {
        --o: 1;
      }
    }
    & > span {
      --number: var(--number-active);
    }
  }
  &.animation {
    .text {
      svg {
        --background: var(--heart-background-active);
        --border: var(--heart-border-active);
        --shadow-light: var(--heart-shadow-light);
        --shadow-dark: var(--heart-shadow-dark);
      }
    }
    .paws {
      svg {
        &.paw {
          --x: 0;
          --o: 1;
          transition-delay: 0s;
          animation: paw 0.45s ease forwards;
        }
        &.paw-clap {
          animation: paw-clap 0.5s ease-in forwards;
        }
      }
      .paw-effect {
        --s: 1;
        --o: 0;
      }
    }
  }
  &.confetti {
    i {
      animation: confetti 0.6s ease-out forwards;
    }
    .paws {
      svg {
        &.paw {
          --o: 0;
          transition: opacity 0.15s linear 0.2s;
        }
      }
    }
  }
  &.liked {
    --background: var(--background-active);
    --border: var(--border-active);
    .text {
      --w: 21px;
      svg {
        --o: 1;
      }
    }
    & > span {
      --number: var(--number-active);
    }
  }
  @keyframes confetti {
    from {
      transform: translate(0, 0);
      opacity: 1;
    }
  }
  @keyframes paw {
    0% {
      transform: translateX(var(--x));
    }
    35% {
      transform: translateX(-16px);
    }
    55%,
    70% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-12px);
    }
  }
  @keyframes paw-clap {
    50%,
    70% {
      transform: translate(0, 0);
    }
  }
`;
