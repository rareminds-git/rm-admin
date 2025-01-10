/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import parse from 'html-react-parser';

import {
  ClassicEditor,
  AccessibilityHelp,
  Autoformat,
  AutoImage,
  AutoLink,
  Autosave,
  Bold,
  CloudServices,
  Code,
  CodeBlock,
  Essentials,
  GeneralHtmlSupport,
  Heading,
  HtmlComment,
  HtmlEmbed,
  ImageBlock,
  ImageCaption,
  ImageInline,
  ImageInsert,
  ImageInsertViaUrl,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Italic,
  Link,
  LinkImage,
  List,
  ListProperties,
  Paragraph,
  PasteFromOffice,
  PictureEditing,
  SelectAll,
  ShowBlocks,
  SourceEditing,
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  TextTransformation,
  Undo,
  SimpleUploadAdapter
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';

/**
 * Please update the following values with your actual tokens.
 * Instructions on how to obtain them: https://ckeditor.com/docs/trial/latest/guides/real-time/quick-start.html
 */

export default function TextEditor({ defaultValue, pageData, setBtnDisabled, setFormData, formData, contentSlug, btnDisabled, index }) {
  const editorContainerRef = useRef(null);
  const editorRef = useRef(null);
  const [isLayoutReady, setIsLayoutReady] = useState(false);
  const [agenda, setAgenda] = useState();

  useEffect(() => {
    setIsLayoutReady(true);

    return () => setIsLayoutReady(false);
  }, []);

  const inputHandler = (event, editor) => {
    if (contentSlug === 'eventAgenda') {
      console.log('form data agenda', formData.eventAgenda);
      let eventAgenda = formData.eventAgenda || [];
      console.log('eventAgenda', eventAgenda);
      if (eventAgenda.length > 0 && eventAgenda[index]) {
        console.log('index exist', eventAgenda[index]);
        eventAgenda[index]['Description'] = editor.getData();
      } else {
        console.log('new index');
        eventAgenda[index] = {};
        eventAgenda[index].Description = editor.getData();
      }
      console.log('eventAgenda after', eventAgenda);
      // setAgenda(eventAgenda);
      setFormData({ ...formData, eventAgenda: eventAgenda });
    }

    contentSlug === 'servicePrograms'
      ? setFormData({
          ...formData,
          servicePrograms: {
            ...formData.servicePrograms,
            ContentDescription: editor.getData(),
            ContentDetailId: pageData?.studyDetails?.ContentDetailId
          }
        })
      : contentSlug === 'studyDetails'
        ? setFormData({
            ...formData,
            studyDetails: {
              ...formData.studyDetails,
              ContentDescription: editor.getData(),
              ContentDetailId: pageData?.studyDetails?.ContentDetailId
            }
          })
        : contentSlug === 'blogDetails'
          ? setFormData({
              ...formData,
              blogDetails: {
                ...formData.blogDetails,
                ContentDescription: editor.getData(),
                ContentDetailId: pageData?.blogDetails?.ContentDetailId
              }
            })
          : contentSlug === 'generalEventDetails'
            ? setFormData({
                ...formData,
                generalEventDetails: {
                  ...formData.generalEventDetails,
                  ContentDescription: editor.getData(),
                  ContentDetailId: pageData?.generalEventDetails?.ContentDetailId
                }
              })
          : contentSlug !== 'eventAgenda' &&
            setFormData((prevState) => ({
              ...prevState,
              [contentSlug]: { ...prevState[contentSlug], Description: editor.getData() }
            }));
    setBtnDisabled({ ...btnDisabled, [contentSlug]: false });
  };

  const editorConfig = {
    toolbar: {
      items: [
        'undo',
        'redo',
        '|',
        'sourceEditing',
        'showBlocks',
        'selectAll',
        '|',
        'heading',
        '|',
        'bold',
        'italic',
        'code',
        '|',
        'link',
        'insertImage',
        'insertTable',
        'codeBlock',
        'htmlEmbed',
        '|',
        'bulletedList',
        'numberedList',
        '|',
        'accessibilityHelp'
      ],
      shouldNotGroupWhenFull: true
    },
    plugins: [
      AccessibilityHelp,
      Autoformat,
      AutoImage,
      AutoLink,
      Autosave,
      Bold,
      CloudServices,
      Code,
      CodeBlock,
      Essentials,
      GeneralHtmlSupport,
      Heading,
      HtmlComment,
      HtmlEmbed,
      ImageBlock,
      ImageCaption,
      ImageInline,
      ImageInsert,
      ImageInsertViaUrl,
      ImageResize,
      ImageStyle,
      ImageTextAlternative,
      ImageToolbar,
      ImageUpload,
      Italic,
      Link,
      LinkImage,
      List,
      ListProperties,
      Paragraph,
      PasteFromOffice,
      PictureEditing,
      SelectAll,
      ShowBlocks,
      SimpleUploadAdapter,
      SourceEditing,
      Table,
      TableCaption,
      TableCellProperties,
      TableColumnResize,
      TableProperties,
      TableToolbar,
      TextTransformation,
      Undo
    ],
    heading: {
      options: [
        {
          model: 'paragraph',
          title: 'Paragraph',
          class: 'ck-heading_paragraph'
        },
        {
          model: 'heading1',
          view: 'h1',
          title: 'Heading 1',
          class: 'ck-heading_heading1'
        },
        {
          model: 'heading2',
          view: 'h2',
          title: 'Heading 2',
          class: 'ck-heading_heading2'
        },
        {
          model: 'heading3',
          view: 'h3',
          title: 'Heading 3',
          class: 'ck-heading_heading3'
        },
        {
          model: 'heading4',
          view: 'h4',
          title: 'Heading 4',
          class: 'ck-heading_heading4'
        },
        {
          model: 'heading5',
          view: 'h5',
          title: 'Heading 5',
          class: 'ck-heading_heading5'
        },
        {
          model: 'heading6',
          view: 'h6',
          title: 'Heading 6',
          class: 'ck-heading_heading6'
        }
      ]
    },
    htmlSupport: {
      allow: [
        {
          name: /^.*$/,
          styles: true,
          attributes: true,
          classes: true
        }
      ]
    },
    image: {
      toolbar: [
        'toggleImageCaption',
        'imageTextAlternative',
        '|',
        'imageStyle:inline',
        'imageStyle:wrapText',
        'imageStyle:breakText',
        '|',
        'resizeImage',
        '|'
      ]
    },
    initialData:
      contentSlug === 'servicePrograms' ||
      contentSlug === 'studyDetails' ||
      contentSlug === 'blogDetails' ||
      contentSlug === 'generalEventDetails' ||
      contentSlug === 'privacy' ||
      contentSlug === 't&c' ||
      contentSlug === 'about'
        ? defaultValue
        : pageData && pageData[contentSlug] && pageData[contentSlug].Description,

    link: {
      addTargetToExternalLinks: true,
      defaultProtocol: 'https://',
      decorators: {
        toggleDownloadable: {
          mode: 'manual',
          label: 'Downloadable',
          attributes: {
            download: 'file'
          }
        }
      }
    },
    list: {
      properties: {
        styles: true,
        startIndex: true,
        reversed: true
      }
    },
    placeholder: 'Type or paste your content here!',
    table: {
      contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
    },
    simpleUpload: {
      uploadUrl: `${import.meta.env.VITE_API_URL}blog/image-upload`
    }
  };

  return (
    <div>
      <div className="main-container">
        <div className="editor-container editor-container_classic-editor" ref={editorContainerRef}>
          <div className="editor-container__editor">
            <div ref={editorRef}>
              {isLayoutReady && (
                <CKEditor
                  editor={ClassicEditor}
                  data={
                    contentSlug === 'servicePrograms' ||
                    contentSlug === 'studyDetails' ||
                    contentSlug === 'blogDetails' ||
                    contentSlug === 'generalEventDetails' ||
                    contentSlug === 'privacy' ||
                    contentSlug === 't&c' ||
                    contentSlug === 'careers' ||
                    contentSlug === 'about'
                      ? defaultValue
                      : contentSlug === 'eventAgenda'
                        ? defaultValue === 'undefined'
                          ? ''
                          : defaultValue
                        : pageData && pageData[contentSlug] && pageData[contentSlug].Description
                  }
                  config={editorConfig}
                  onChange={inputHandler}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
