import './styles/ui_grid.scss'

import { memo, useEffect, useRef, useState } from 'react'

import LogUtil from '../utils/LogUtil'

type Props = {
  children: JSX.Element[];
  mainAxis: 'row' | 'column';
  crossAxisCount: number;
  memoPlaceHolder?: Props['children'][0];
  onRefresh?: ((refreshDone: () => void) => void) | null;
};

const DefaultMemoPlaceHolder =
  // memo is tested to be useful, keep it!
  memo(
    () => {
      LogUtil.verbose('DefaultPlaceholder re-render')
      // useEffect(() => {
      //   LogUtil.verbose("DefaultPlaceholder constructed");
      //   return () => LogUtil.verbose("DefaultPlaceholder destructed");
      // }, []);
      return (
        <div
          key='?'
          style={{
            // display: "flex",  // not required!
            background: 'blue',
            minHeight: '1rem',
            minWidth: '1rem',
          }}/>
      )
    },
    () => true
  )

function Gradient({ mainAxis, deg, isHead }: {mainAxis: Props['mainAxis'], deg: number, isHead: boolean }) {
  const GRADIENT_SIZE = '8px'
  return <span style={{
    background: `linear-gradient(${deg}deg,transparent 0%,white 100%)`,
    bottom: isHead ? 'unset' : 0,
    display: 'inline-block',
    height: mainAxis === 'row' ? '100%' : GRADIENT_SIZE,
    left: isHead ? 0 : 'unset',
    position: 'absolute',
    right: isHead ? 'unset' : 0,
    top: isHead ? 0 : 'unset',
    width: mainAxis === 'column' ? '100%' : GRADIENT_SIZE,
    zIndex: 1
  }}/>
}

function UIGrid({
  mainAxis,
  crossAxisCount,
  children,
  // eslint-disable-next-line react/no-object-type-as-default-prop
  memoPlaceHolder = <DefaultMemoPlaceHolder />,
  onRefresh,
}: Props) {
  // LogUtil.verbose("UIGrid (re-)rendering");

  // ref of this UIGrid
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const placeHoldersRef = useRef(
    Array.from<HTMLSpanElement | null>({ length: crossAxisCount }).fill(null)
  )
  // necessary for event listeners to track latest onRefresh fn
  const onRefreshRef = useRef<Props['onRefresh']>(null)

  /*


  */

  // track onRefresh fn change
  useEffect(() => {
    LogUtil.debug('UIGrid useEffect: onRefresh updated!')
    onRefreshRef.current = onRefresh
  }, [onRefresh])

  /*


  */

  // register scroll listener once
  useEffect(() => {
    LogUtil.debug('UIGrid: useEffect: add scroll listener')
    const curRef = scrollContainerRef.current!
    let isRefreshing = false // like mutex lock; prevent inf loop
    function scrollCb() {
      LogUtil.debug(`UIGrid: scroll: started, isRefreshing=${isRefreshing}, !!onRefreshRef.current=${!!onRefreshRef.current}`)
      if (isRefreshing || !onRefreshRef.current) return
      isRefreshing = true
      LogUtil.debug(`UIGrid: scroll: finding placeholders, isRefreshing=${isRefreshing}`)

      let onRefreshDidExecute = false
      const gridTop = Math.max(0, curRef.getBoundingClientRect().top)
      const gridLeft = Math.max(0, curRef.getBoundingClientRect().left)
      const gridBottom = Math.min(
        window.innerHeight || document.documentElement.clientHeight,
        curRef.getBoundingClientRect().bottom
      )
      const gridRight = Math.min(
        window.innerWidth || document.documentElement.clientWidth,
        curRef.getBoundingClientRect().right
      )

      for (const x of placeHoldersRef.current) {
        if (x === null || x.style.display === 'none') continue
        // LogUtil.verbose('UIGrid: scroll: found a placeholder, but not sure if in sight')

        const r = x.getBoundingClientRect()
        // LogUtil.verbose(`UIGrid: scroll:    top: ${r.top<=gridBottom}`)
        // LogUtil.verbose(`UIGrid: scroll:   left: ${r.left<=gridRight}`)
        // LogUtil.verbose(`UIGrid: scroll: bottom: ${r.bottom>=gridTop}`)
        // LogUtil.verbose(`UIGrid: scroll:  right: ${r.right>=gridLeft}`)

        if (
          r.top <= gridBottom && r.left <= gridRight && r.bottom >= gridTop && r.right >= gridLeft
        ) {
          LogUtil.debug('UIGrid: scroll: onRefresh called')
          onRefreshDidExecute = true
          onRefreshRef.current(() => {
            isRefreshing = false
            LogUtil.debug(`UIGrid: scroll: onRefresh: done(callback from onRefresh), isRefreshing=${isRefreshing}`)
          })
          break
        }
      }

      if (!onRefreshDidExecute) {
        isRefreshing = false
        LogUtil.debug(`UIGrid: scroll: done(no placeholder in sight), isRefreshing=${isRefreshing}`)
      }
    }

    curRef.addEventListener('scroll', scrollCb, { passive: true })
    return () => {
      // LogUtil.verbose("UIGrid useEffect unmount: rm scroll listener");
      curRef.removeEventListener('scroll', scrollCb)
    }
  }, [])

  /*


  */

  const [arrs, setArrs] = useState(
    Array.from({ length: crossAxisCount })
      .fill(null)
      .map(() => [] as JSX.Element[])
  )

  /*


  */

  useEffect(() => {
    LogUtil.debug(`UIGrid: useEffect: crossAxisCount=${crossAxisCount}, children size=${children.length}`)

    const arrs_deepcopy: typeof arrs = []
    for (let i = 0; i < crossAxisCount; ++i) arrs_deepcopy.push([])

    for (const [i, child] of children.entries()) {
      const arrIdx = i % arrs_deepcopy.length
      // eslint-disable-next-line security/detect-object-injection
      arrs_deepcopy[arrIdx].push(child)
    }
    setArrs(arrs_deepcopy)

    // let updated = false;

    // const arrs_deepcopy: typeof arrs = [];
    // for (const x of arrs) arrs_deepcopy.push([...x]);

    // for (let i = 0; i < children.length; ++i) {
    //   const arrIdx = i % arrs_deepcopy.length;
    //   const elemIdx = Math.floor(i / arrs_deepcopy.length);
    //   if (elemIdx < arrs_deepcopy[arrIdx].length) {
    //     if (children[i] === arrs_deepcopy[arrIdx][elemIdx]) continue;
    //     arrs_deepcopy[arrIdx][elemIdx] = children[i];
    //   } else arrs_deepcopy[arrIdx].push(children[i]);
    //   // if (!updated) LogUtil.verbose(`updated @ ${arrIdx}, ${elemIdx}`);
    //   updated = true;
    // }
    // if (updated) setArrs(arrs_deepcopy);
  }, [crossAxisCount, children])

  /*


  */

  const originalDeg = mainAxis === 'column' ? 0 : 270

  return (
    <div
      style={{
      // flexDirection: mainAxis,
        height: mainAxis === 'column' ? '100%' : 'auto',
        width: mainAxis === 'row' ? '100%' : 'auto'
      }}
      className='ui-grid'>
      <div className='gradient-wrapper'>
        <Gradient mainAxis={mainAxis} deg={originalDeg} isHead />

        <div
          ref={scrollContainerRef} className='inner-wrapper-in-gradient'>
          <div
            style={{ flexDirection: mainAxis === 'row' ? 'column' : 'row' }}
            className='inner'>
            {arrs.map((xs, ixs) => (
              <div
                key={xs.reduce((prev, curr)=>prev + `${curr.key}`, '') || ixs}
                style={{ flexDirection: mainAxis }}
                className='main-axis'>
                {xs}

                <div
                // eslint-disable-next-line security/detect-object-injection
                  ref={x => placeHoldersRef.current[ixs] = x}
                  className='placeholder-container'
                  key={memoPlaceHolder.key}
                  style={onRefresh ? {} : { display: 'none' }}>
                  {memoPlaceHolder}
                </div>
              </div>
            ))}
          </div>
        </div>

        <Gradient mainAxis={mainAxis} deg={originalDeg + 180} isHead={false} />
      </div>
    </div>
  )
}

export default memo(UIGrid)

// Push 25 original children
// User scrolls to the bottom
// Each column has different height
// Placeholder offsets the height difference
// Placeholder scrolls into view
// onRefresh is called
// onRefresh fetches the data
// onRefresh finishes, call the callback
// Children is changed into 50 children (including the original ones)
// user scrolls again to the bottom
// Placeholder scrolls into view
// onRefresh is called
// onRefresh failed on fetching the data (all data has been fetched)
// onRefresh is changed into null by the caller.
// call the callback
// Placeholder disappears.
