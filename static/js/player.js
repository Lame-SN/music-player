const playlist = () => {
    let array = []
    let playlist = ['resource/audio/1.mp3', 'resource/audio/2.mp3', 'resource/audio/3.mp3', 'resource/audio/4.mp3',
        'resource/audio/5.mp3', 'resource/audio/6.mp3', 'resource/audio/7.mp3', 'resource/audio/8.mp3',
        'resource/audio/9.mp3']
    let playname = ['Heavydirtysoul', 'StressedOut', 'Ride', 'Fairy Local', 'Tear in My Heart',
        'Lane Boy', 'The Judge', 'Doubt', 'Polarize']
    array.push(playlist)
    array.push(playname)
    return array
}

const togglePlayPause = (audio) => {
    let button = e('#play')
    button.addEventListener('click', function(event) {
        if (audio.paused || audio.ended) {
            button.title = "Pause"
            audio.play()
        } else {
            button.title = "Play"
            audio.pause()
        }
    })
}

const bindplayertime = () => {
    // 设置总时间的显示
    let audio = e('#audio')
    let duration = audio.duration
    let duration_time = `${parseInt(duration / 60)} : ${(duration % 60).toFixed(0)}`
    let d = e('.duration')
    d.innerHTML = duration_time
    // 设置当前时间的显示
    let c = e('.current-time')
    let interval = 1000
    let clockId = setInterval(function() {
        let current = audio.currentTime
        let current_time = `${parseInt(current / 60)} : ${(current % 60).toFixed(0)}`
        // 每 1s 调用这个函数
        c.innerHTML = current_time
        // 设置播放条
        let duration1 = audio.duration
        let dd = (current / duration1) * 100
        let span = e('#time-span')
        span.style = `width: ${dd}%`
    }, interval)
}

const bindEventCanplay = (audio) => {
    // 读取完成再显示时间
    audio.addEventListener('canplay', function(event) {
        bindplayertime()
    })
}

const bindEventPlaylist = (audio) => {
    let seletor = '.title'
    bindAll(seletor, 'click', function(event) {
        let self = event.target
        let path = self.dataset.path
        audio.src = path
        audio.play()
    })
}

const bindPlayname = (audio) => {
    let array = playlist()
    let arr1 = array[0]
    let arr2 = array[1]
    let s = audio.src
    let index = s.indexOf('resource/')
    let now_s = s.slice(index)
    let now = arr1.indexOf(now_s)
    let t = arr2[now]
    let info = e('.info')
    let title = info.querySelector('h4')
    title.innerHTML = t
}

const choice = (array) => {
    let a = Math.random()
    let n = a * array.length
    let n1 = Math.floor(n)
    return array[n1]
}

const actionEnded = (audio, mode) => {
    let array = playlist()
    let arr = array[0]
    log("播放结束, 当前播放模式是", mode)
    if (mode === 'loop') {
        audio.play()
    } else if (mode === 'shuffle') {
        audio.src = choice(arr)
        bindPlayname(audio)
        audio.play()
    } else if (mode === 'order') {
        let s = audio.src
        let index = s.indexOf('resource/')
        let now_s = s.slice(index)
        log('当前歌曲', now_s)
        let now = arr.indexOf(now_s)
        let n = (now + 1) % 3
        audio.src = arr[n]
        log('下一曲歌曲', arr[n])
        bindPlayname(audio)
        audio.play()
    }
}

const bindEventEnded = (audio) => {
    let mode = audio.dataset.mode
    audio.addEventListener('ended', (event) => {
        log('end')
        actionEnded(audio, mode)
    })
}
const bindEventShuffle = (audio) => {
    let s = e('.shuffle')
    s.addEventListener('click', (event) => {
        audio.dataset.mode = 'shuffle'
    })
}

const bindEventLoop = (audio) => {
    let s = e('.repeat')
    s.addEventListener('click', (event) => {
        audio.dataset.mode = 'loop'
    })
}

const bindEventOrder = (audio) => {
    let s = e('.options')
    s.addEventListener('click', (event) => {
        audio.dataset.mode = 'order'
    })
}

const bindEventBackward = (audio) => {
    let array = playlist()
    let arr = array[0]
    let backward = e('.backward')
    backward.addEventListener('click', (event) => {
        let s = audio.src
        let index = s.indexOf('resource/')
        let now_s = s.slice(index)
        log('当前歌曲', now_s)
        let now = arr.indexOf(now_s)
        let n = (arr.length + now - 1) % arr.length
        audio.src = arr[n]
        log('上一曲歌曲', arr[n])
        bindPlayname(audio)
        audio.play()
    })
}

const bindEventNext = (audio) => {
    let array = playlist()
    let arr = array[0]
    let forward = e('.forward')
    forward.addEventListener('click', (event) => {
        let s = audio.src
        let index = s.indexOf('resource/')
        let now_s = s.slice(index)
        log('当前歌曲', now_s)
        let now = arr.indexOf(now_s)
        let n = (now + 1) % arr.length
        audio.src = arr[n]
        log('下一曲歌曲', arr[n])
        bindPlayname(audio)
        audio.play()
    })
}

const bindEvents = () => {
    let audio = e('#audio')
    togglePlayPause(audio)
    bindEventPlaylist(audio)
    bindEventCanplay(audio)
    bindEventEnded(audio)
    bindEventShuffle(audio)
    bindEventLoop(audio)
    bindEventOrder(audio)
    bindEventBackward(audio)
    bindEventNext(audio)
    bindPlayname(audio)
}

const __main = () => {
    bindEvents()
}

__main()