import UIKeyboardInput, { INPUT_TYPE } from './UIKeyboardInput'
import UIKeyboardSelect, { UISelectOptionContent } from './UIKeyboardSelect'
import { useCallback, useState } from 'react'

import LogUtil from '../utils/LogUtil'
import RTIconSource from '../assets/RTIconSource'
import UIButton from './UIButton'
import UICard from './UICard'
import UICardGroup from './UICardGroup'
import UIFileUploader from './UIFileUploader'
import UIFlexBox from './UIFlexbox'
import UIGrid from './UIGrid'
import UIImage from './UIImage'
import UILineSeparator from './UILineSeparator'
import UILink from './UILink'
import { UIModal } from './UIModal'
import { UIRadio } from './UIRadio'
import UIRadioGroup from './UIRadioGroup'
import UITag from './UITag'
import UIText from './UIText'
import { useToast } from './UIToast'

function convertToHTMLOptions(options: UISelectOptionContent[]) {
  return options.map(item => (
    <option
      key={item.label}
      value={item.value}>
      {item.label}
    </option>))
}

function Demo() {
  const toast = useToast()
  const [isModal1Shown, setIsModal1Shown] = useState(false)
  const [isModal2Shown, setIsModal2Shown] = useState(false)
  const [isNestedModalShown, setIsNestedModalShown] = useState(false)
  const year = new Date().getFullYear()
  const yearOption = [
    { label: '', value: '' },
    { label: year - 10, value: year - 10 },
    { label: year - 9, value: year - 9 },
    { label: year - 8, value: year - 8 },
    { label: year - 7, value: year - 7 },
    { label: year - 6, value: year - 6 },
    { label: year - 5, value: year - 5 },
    { label: year - 4, value: year - 4 },
    { label: year - 3, value: year - 3 },
    { label: year - 2, value: year - 2 },
    { label: year - 1, value: year - 1 },
    { label: year, value: year },
    { label: year + 1, value: year + 1 },
    { label: year + 2, value: year + 2 },
    { label: year + 3, value: year + 3 },
    { label: year + 4, value: year + 4 }
  ]
  const degreeOption = [
    { label: '', value: '' },
    { label: 'Current Undergrad Student', value: 'Current Undergrad Student' },
    { label: 'Bachelor', value: 'Bachelor' },
    { label: 'Master', value: 'Master' },
    { label: 'PhD', value: 'PhD' }]
  return (
    <UIFlexBox
      direction='column'
      style={{
        alignItems: 'flex-start',
        boxSizing: 'border-box',
        height: '100%',
        padding: '8px',
        width: '100%',
      }}>
      <UIText variant='h1'>Heading 1</UIText>
      <UIText variant='h2'>Heading 2</UIText>
      <UIText variant='h3'>Heading 3</UIText>

      <UIText>
        Default text: Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Molestiae nihil officia quis expedita quaerat vel ab quidem, voluptatum
        voluptas, cum distinctio odit doloribus vitae! Earum voluptates animi
        facilis <b>inline bold text using {'<b></b>'}</b> quisquam.
      </UIText>

      <UIText bold>Bold text</UIText>
      <UIText variant='error-text'>Error: This is an error.</UIText>

      <UIText variant='success-text'>
        Success: This is a successful operation.
      </UIText>

      <UILineSeparator direction='horizontal' />

      <UIFlexBox>
        <UIText>
          This useless <UILink navigate='/demo'>link</UILink> navigates you to
          this demo page.{' '}
        </UIText>

        <UILineSeparator direction='vertical' />

        <UIText>
          This is a secondary{' '}

          <UILink navigate='/demo' variant='secondary'>
            link
          </UILink>
          .
        </UIText>

        <UILineSeparator direction='vertical' />

        <UIText>
          This is a disabled{' '}

          <UILink navigate='/demo' disabled disabledMessage='Disabled...'>
            link
          </UILink>
          .
        </UIText>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />

      <UIFlexBox>
        <UIButton text='submit' margin={4} />
        <UILineSeparator direction='vertical' />
        <UIButton text='submit' variant='secondary' margin={4} dot />
        <UILineSeparator direction='vertical' />

        <UIButton
          text='submit disabled'
          disabled
          grow='1'
          margin={4}
          disabledMessage='This button is disabled'/>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />

      <UIText>
        This is the image section. Please mind the difference between
        <b>"inside-to-outside"/"wrap-content"</b> sizing and
        <b>"outside-to-inside"/"match-parent"</b> sizing.
      </UIText>

      <UIFlexBox style={{ height: '100px' }}>
        <UIText>
          This is an image <UIImage src={RTIconSource.LogoPlaceholder} /> that will never
          exceed the container and always show all the contents.
        </UIText>
      </UIFlexBox>

      <UIFlexBox>
        <UIText>
          This is an image{' '}

          <UIImage
            src={RTIconSource.LogoPlaceholder}
            fillWithCropFocus='center'
            height='50px'
            width='200px'/>{' '}
          that will never exceed the container but will crop to show only part
          of the image.
        </UIText>
      </UIFlexBox>

      <UIFlexBox
        direction='row'
        style={{
          alignItems: 'center',
          height: '100px',
          padding: '8px',
        }}>
        <UICard style={{ height: '100%' }}>
          <UIFlexBox style={{ height: '100%', width: '100%' }}>
            <UIImage src={RTIconSource.LogoPlaceholder} variant='round' />
            <UILineSeparator direction='vertical' />
            <UIImage src={RTIconSource.LogoPlaceholder} variant='square' />
          </UIFlexBox>
        </UICard>

        <UICard style={{ height: '100%' }}>
          <UIFlexBox style={{ height: '100%', width: '100%' }}>
            <UIImage src={RTIconSource.LogoPlaceholder} variant='round' />
            <UILineSeparator direction='vertical' />
            <UIImage src={RTIconSource.LogoPlaceholder} variant='square' />
          </UIFlexBox>
        </UICard>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />
      <UIText>This is a UIRadioGroup.</UIText>

      <UIFlexBox>
        <UIRadioGroup
          name='radiogroup1'
          label='Radio Group 1'
          variant='primary'
          direction='row'
          gap={16}
          isRequired>
          <UIRadio name='radio1' label='Radio 1' />
          <UIRadio name='radio2' label='Radio 2' />
          <UIRadio name='radio3' label='Radio 3' />
        </UIRadioGroup>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />
      <UIText>This is a UIKeyboardSelect.</UIText>

      <UIKeyboardSelect
        id='demo-graduation-year'
        name='demo-graduation-year'
        label='Expected Graduation Year'
        isMulti={false}
        placeholder='Please select expected graduation year'
        options={convertToHTMLOptions(yearOption)}/>

      <UIText>This is a multi-selectable UIKeyboardSelect.</UIText>

      <UIKeyboardSelect
        id='demo-help-type'
        name='demo-help-type'
        label='Degree Level'
        isMulti
        placeholder='Please select your current degree level'
        options={convertToHTMLOptions(degreeOption)}/>

      <UILineSeparator direction='horizontal' />

      <UIFlexBox direction='column'>
        <UIText>This is a UIKeyboardInput</UIText>

        <UIKeyboardInput
          label='Input'
          type={INPUT_TYPE.TEXT}
          name=''
          isRequired
          icon={RTIconSource.EmailIcon}
          isMulti
          variant='primary'/>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />

      <UIFlexBox direction='column'>
        <UIText>This is a UIFileUploader</UIText>
        <UIFileUploader label='Upload File' name='' isRequired />
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />
      <UIText>This is the demo for UIToast</UIText>

      <UIFlexBox>
        <UIButton
          text='success'
          onClick={() => {
            toast('This is a success toast message!', 'success', 2000, 'Yeah')
          }}/>

        <UILineSeparator direction='vertical' />

        <UIButton
          text='error'
          onClick={() => {
            toast('This is an error toast message!', 'error', null, 'Oh')
          }}/>

        <UILineSeparator direction='vertical' />

        <UIButton
          text='info'
          onClick={() => {
            toast(
              'This is an info toast message!',
              'info',
              2000,
              'OK'
            )
          }}/>
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />
      <UIText>This is the demo for UIGrid</UIText>

      <UIFlexBox direction='column'>
        <DemoUiGridHorizontal />
      </UIFlexBox>

      <UILineSeparator direction='horizontal' />
      <UIText>This is the demo for UIModal</UIText>
      <UIFlexBox>
        <UIButton
          margin={4}
          text='Show First Modal'
          onClick={() => {
            setIsModal1Shown(true)
          }}/>

        <UIModal
          isShown={isModal1Shown}
          onClose={() => {
            setIsModal1Shown(false)
          }}>
          <UIText>This is a modal.</UIText>
        </UIModal>

        <UIButton
          margin={4}
          text='Show nested Modal'
          onClick={() => {
            setIsModal2Shown(true)
          }}/>

        <UIModal
          isShown={isModal2Shown}
          onClose={() => {
            setIsModal2Shown(false)
          }}>
          <UIFlexBox direction='column'>
            <UIText>This is the first modal.</UIText>

            <UIButton text='Open nested modal' onClick={() => {
              setIsNestedModalShown(true)
            }}/>

            <UIModal
              isShown={isNestedModalShown}
              onClose={() => {
                setIsNestedModalShown(false)
              }}>
              <UIText>This is the nested modal.</UIText>
            </UIModal>
          </UIFlexBox>
        </UIModal>
      </UIFlexBox>
      <UILineSeparator direction='horizontal' />
      <UIText>This is the demo for UICardGroup</UIText>
      <UICardGroup>
        <UICard style={{width: "100px", height: "200px"}}>
          <UIText>1</UIText>
        </UICard>
        <UICardGroup direction='column'>
        <UICard style={{width: "100px", height: "100px"}}>
          <UIText>2</UIText>
        </UICard>
        <UICard style={{width: "100px", height: "100px"}}>
          <UIText>3</UIText>
        </UICard>
        </UICardGroup>
      </UICardGroup>
      <UILineSeparator direction='horizontal' />
      <UIText>This is the demo for UITag</UIText>
      <UIFlexBox>
        <UITag text='DEFAULT'/>
        <UITag text='DANGER' color='red'/>
        <UITag text='WARNING' color='orange' />
        <UITag text='SAFE' color='green'/>
        <UITag text='STABLE' color='blue'/>
      </UIFlexBox>
    </UIFlexBox>
  )
}

function DemoUiGridHorizontal() {
  const [arr, setArr] = useState(
    Array.from({ length: 27 })
      .fill(null)
      .map((_, i) => {
        function Wrapper() {
          return (
            <div
              style={{
                border: '1px solid #ccc',
                flexShrink: 0,
                width: `${2 + (i % 2)}rem`,
              }}
              key={i}>
              {i}
            </div>
          )
        }
        return <Wrapper key={i} />
      })
  )
  const [allDataFetched, setAllDataFetched] = useState(false)
  const onRefresh = useCallback(
    (refreshDone: () => void) => {
      setTimeout(() => {
        const id = arr.length + 3
        setArr([
          ...arr,
          <div
            style={{
              border: '1px solid #ccc',
              flexShrink: 0,
              width: `${1 + (id % 2)}rem`,
            }}
            key={id}>
            {id}
          </div>,
        ])
        if (Math.random() > 0.5) {
          LogUtil.verbose('Horizontal no more data!')
          setAllDataFetched(true)
        }
        refreshDone()
      }, 800)
    },
    [arr]
  )

  return (
    <>
      <div style={{ width: '200px' }}>
        <UIGrid
          mainAxis='row'
          crossAxisCount={3}
          onRefresh={allDataFetched ? null : onRefresh}>
          {arr}
        </UIGrid>
      </div>

      <button
        type='button'
        onClick={() => {
          const id = arr.length + 3
          setArr([
            ...arr,
            <div
              style={{
                border: '1px solid #ccc',
                flexShrink: 0,
                width: `${1 + (id % 2)}rem`,
              }}
              key={id}>
              {id}
            </div>,
          ])
          setAllDataFetched(false)
        }}>
        add to horizontal grid
      </button>
    </>
  )
}

export default Demo
