import sanitizeHtml from 'sanitize-html';

// HTML을 sanitize하고 JSON 형태로 변환
export const htmlToJson = (html: string) => {
  // HTML sanitize 설정
  const sanitizeOptions = {
    allowedTags: [
      'p',
      'br',
      'strong',
      'b',
      'em',
      'i',
      'u',
      's',
      'del',
      'h1',
      'h2',
      'h3',
      'h4',
      'h5',
      'h6',
      'ul',
      'ol',
      'li',
      'a',
      'blockquote',
      'code',
      'pre',
      'mark', // TipTap Highlight 확장용
      'hr', // TipTap HorizontalRule 확장용
    ],
    allowedAttributes: {
      a: ['href', 'target'],
      mark: ['data-color'], // TipTap Highlight 확장에서 사용할 수 있는 색상 속성
      '*': ['style'], // 제한적인 스타일 허용
    },
    allowedStyles: {
      '*': {
        color: [
          /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, // 3자리 또는 6자리 hex
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/,
        ],
        'background-color': [
          /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/, // 3자리 또는 6자리 hex
          /^rgb\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*\)$/,
          /^rgba\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(0|1|0?\.\d+)\s*\)$/,
        ],
        'font-weight': [/^(bold|normal|[1-9]00)$/], // 100-900 also allowed
        'font-style': [/^(italic|normal|oblique)$/],
        'text-decoration': [/^(underline|line-through|none|overline)$/],
        'text-align': [/^(left|center|right|justify)$/], // TipTap TextAlign 확장용
      },
    },
  };

  // HTML sanitize
  const sanitizedHtml = sanitizeHtml(html, sanitizeOptions);

  // 플레인 텍스트 추출 (검색, 미리보기 등에 활용)
  const textContent = sanitizeHtml(html, { allowedTags: [], allowedAttributes: {} });

  // 단어 수 계산
  const wordCount = textContent
    .trim()
    .split(/\s+/)
    .filter(word => word.length > 0).length;

  // JSON 형태로 반환
  const json = {
    htmlContent: sanitizedHtml,
    textContent: textContent,
    wordCount: wordCount,
    hasFormatting: sanitizedHtml !== textContent,
    metadata: {
      sanitizedAt: new Date().toISOString(),
      originalLength: html.length,
      sanitizedLength: sanitizedHtml.length,
    },
  };

  try {
    // JSON 객체를 안전하게 직렬화
    const jsonString = JSON.stringify(json, null, 0);

    // 생성된 JSON 유효성 재검증
    const parsed = JSON.parse(jsonString);

    // 추가 검증: htmlContent가 올바르게 이스케이프되었는지 확인
    if (parsed.htmlContent !== json.htmlContent) {
      throw new Error('HTML content serialization mismatch');
    }

    return jsonString;
  } catch (error) {
    console.error('JSON 직렬화 오류:', error);
    console.error('문제가 된 객체:', json);
    console.error('HTML 내용:', json.htmlContent);

    // 더 안전한 fallback: HTML 내용을 base64로 인코딩
    const safeHtmlContent = btoa(unescape(encodeURIComponent(json.htmlContent || '')));
    return JSON.stringify({
      htmlContent: safeHtmlContent,
      textContent: json.textContent,
      wordCount: json.wordCount,
      hasFormatting: json.hasFormatting,
      metadata: {
        ...json.metadata,
        error: 'JSON serialization failed - HTML encoded as base64',
        isBase64Encoded: true,
      },
    });
  }
};

// JSON을 다시 HTML로 변환 (조회 시 사용)
export const jsonToHtml = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);

    // base64로 인코딩된 경우 디코딩
    if (parsed.metadata?.isBase64Encoded) {
      try {
        const decodedHtml = decodeURIComponent(escape(atob(parsed.htmlContent)));
        return decodedHtml;
      } catch (decodeError) {
        console.error('Base64 디코딩 오류:', decodeError);
        return parsed.textContent || '';
      }
    }

    return parsed.htmlContent || parsed.content || '';
  } catch (error) {
    console.error('JSON parsing error:', error);
    return jsonString; // JSON이 아닌 경우 원본 반환
  }
};

// 플레인 텍스트만 추출
export const getTextFromJson = (jsonString: string): string => {
  try {
    const parsed = JSON.parse(jsonString);
    return parsed.textContent || '';
  } catch (error) {
    console.error('JSON parsing error:', error);
    return sanitizeHtml(jsonString, { allowedTags: [], allowedAttributes: {} });
  }
};
