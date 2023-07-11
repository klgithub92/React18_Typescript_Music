import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Slider, message, Tooltip } from 'antd'
import {
  BarControl,
  BarOperator,
  BarPlayerInfo,
  PlayerBarWrapper
} from './style'
import { shallowEqualApp, useAppDispatch, useAppSelector } from '@/store'
import { formatTime, getImageSize } from '@/utils/format'
import { getSongPlayUrl } from '@/utils/handle-player'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction
} from '../store/player'

interface IProps {
  children?: ReactNode
}

const AppPlayerBar: FC<IProps> = () => {
  /** 定义组件内部数据*/
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 当前进度 正数 百分之多少
  const [duration, setDuration] = useState(0) // 总时长
  const [currentTime, setCurrentTime] = useState(0) // 当前时间
  const [isSliding, setIsSliding] = useState(false) // 是否推拽

  const audioRef = useRef<HTMLAudioElement>(null)

  /** 从redux中获取数据*/
  const { currentSong, lyrics, lyricIndex, playMode, playSongList } =
    useAppSelector(
      (state) => ({
        currentSong: state.player.currentSong,
        lyrics: state.player.lyrics,
        lyricIndex: state.player.lyricIndex,
        playMode: state.player.playMode,
        playSongList: state.player.playSongList
      }),
      shallowEqualApp
    )
  const dispatch = useAppDispatch()

  /** 组件内部副作用*/
  useEffect(() => {
    // 1.播放音乐
    audioRef.current!.src = getSongPlayUrl(currentSong?.id)
    //开始就是否自动播放
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
        console.log('歌曲播放成功')
      })
      .catch((err) => {
        setIsPlaying(false)
        console.log('歌曲播放失败:', err)
      })

    // 2.获取音乐的总时长
    setDuration(currentSong?.dt)
  }, [currentSong])

  /** 音乐播放的进度处理 */
  function handleTimeUpdate() {
    // 1.获取当前的播放时间
    const currentTime = audioRef.current!.currentTime * 1000

    // 2.在没有拖拽的情况下 计算当前进度
    if (!isSliding) {
      const progress = (currentTime / duration) * 100 // 百分比
      setProgress(progress) // 控制Slider里的value属性
      setCurrentTime(currentTime) // 记录当前播放时间
    }

    // 3.根据当前的时间匹配对应的歌词
    // 需要currentTime/lyrics
    let index = lyrics.length - 1 // 这样可以读到最有一句歌词
    for (let i = 0; i < lyrics.length; i++) {
      const lyric = lyrics[i]
      if (lyric.time > currentTime) {
        index = i - 1 // 保存上一条索引
        break
      }
    }

    // 4.匹配上对应的歌词的index
    // 提升性能
    if (lyricIndex === index || index === -1) return // 还是同一句歌词
    dispatch(changeLyricIndexAction(index))
    console.log(lyrics[index].text)

    // 5.展示对应的歌词
    message.open({
      content: lyrics[index].text,
      duration: 0,
      key: 'lyric' // key一样就会显示当前一条了
      // style: {
      //   color: 'red'
      // },
      // className: 'ant-message'
    })
  }

  /** 拖拽事件处理*/
  function handleSliderChanging(value: number) {
    // 0.目前是处于拖拽状态
    setIsSliding(true)

    // 1.设置progress
    setProgress(value)

    // 2.获取当前位置对应的时间
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  /** 点击到对应位置播放*/
  function handleAClickSliderChanged(val: number) {
    if (isPlaying) setIsPlaying(true)
    // 1.获取点击位置的时间
    const currentTime = (val / 100) * duration // 占总时间的比例*总时间 ms
    // 2.设置当前播放的时间s(audio默认当前播放时间为秒)
    audioRef.current!.currentTime = currentTime / 1000
    // 3.设置currentTime/progress
    setCurrentTime(currentTime)
    setProgress(val)
    setIsSliding(false) // 当前不在拖拽状态
  }

  /** 切换播放模式*/
  function handleChangePlayMode() {
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  /** 提升播放模式*/
  function showPlayMode() {
    if (playMode === 0) {
      return '顺序播放'
    }
    if (playMode === 1) {
      return '随机播放'
    }
    if (playMode === 2) {
      return '单曲播放'
    }
  }

  /** 上一首和下一首*/
  function handleChangeMusic(isNext = true) {
    dispatch(changeMusicAction(isNext))
  }

  /** 歌曲播放完了*/
  function handleTimeEnded() {
    // 单曲循环或者只有一首了
    if (playMode === 2 || playSongList.length === 1) {
      // 单曲循环播放
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  /** 组件内部事件处理*/
  function handlePlayBtnClick() {
    // 1.控制播放器的播放和暂停
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))

    // 2.改变isPlaying状态
    setIsPlaying(!isPlaying)
  }

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <BarControl isPlaying={isPlaying}>
          <button
            className="btn sprite_playbar prev"
            onClick={() => handleChangeMusic(false)}
          ></button>
          <button
            className="btn sprite_playbar play"
            onClick={handlePlayBtnClick}
          ></button>
          <button
            className="btn sprite_playbar next"
            onClick={() => handleChangeMusic(false)}
          ></button>
        </BarControl>
        <BarPlayerInfo>
          <Link to="/player">
            <img
              className="image"
              src={getImageSize(currentSong?.al?.picUrl, 50)}
              alt=""
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong?.name}</span>
              <span className="singer-name">{currentSong?.ar?.[0]?.name}</span>
            </div>
            <div className="progress">
              {/* Slider组件 */}
              <Slider
                value={progress}
                tooltip={{ formatter: null }}
                step={0.5} // 步长
                onChange={handleSliderChanging} // 拖拽事件
                onAfterChange={handleAClickSliderChanged} // 与 onmouseup 触发时机一致
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </BarPlayerInfo>
        <BarOperator playMode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <Tooltip title={showPlayMode}>
              <button
                className="btn sprite_playbar loop"
                onClick={handleChangePlayMode}
              ></button>
            </Tooltip>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </BarOperator>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleTimeEnded}
      />
    </PlayerBarWrapper>
  )
}
export default memo(AppPlayerBar)
