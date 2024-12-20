export const getEditPageData = (data) => {
  let updatedData = {};
  if (data.pageData.PageType === 1) {
    data.sectionData.map((ele) => {
      updatedData[ele.ContentSlug] = ele;
    });
  } else {
    updatedData.sectionData = data.sectionData;
  }
  updatedData.pageData = data.pageData;

  return updatedData;
};

export const getServicePageData = (data) => {
  let updatedData = {};

  updatedData.pageData = data.servicePageData;
  updatedData['services'] = data.servicePageData;
  updatedData.serviceData = data.serviceData;
  return updatedData;
};

export const getServiceProgramData = (data) => {
  let updatedData = {};

  updatedData.pageData = data.serviceData;
  updatedData['services'] = data.servicePrograms;
  updatedData.serviceData = data.serviceData;

  return updatedData;
};

export const getStudyData = (data) => {
  let updatedData = {};

  updatedData.pageData = data.pageData;
  updatedData['studies'] = data.studyData;

  return updatedData;
};

export const getBlogData = (data) => {
  let updatedData = {};

  updatedData.pageData = data.blogData;
  updatedData['blogDetails'] = data.blogDetails[0];

  return updatedData;
};

export const getStudyDetail = (data) => {
  let updatedData = {};
  console.log('data', data);

  updatedData.pageData = data.studyData;
  updatedData['studyDetails'] = data.studyDetails[0];

  return updatedData;
};

var entities = {
  amp: '&',
  apos: "'",
  '#x27': "'",
  '#x2F': '/',
  '#39': "'",
  '#47': '/',
  lt: '<',
  gt: '>',
  nbsp: ' ',
  quot: '"'
};

export function decodeHTMLEntities(text) {
  if (text) {
    return text.replace(/&([^;]+);/gm, function (match, entity) {
      return entities[entity] || match;
    });
  }
}

export function convertToSlug(Text) {
  return Text.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
