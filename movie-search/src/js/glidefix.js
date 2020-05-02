// import Html from '@glidejs/glide/src/components/html';
import Html from '../../node_modules/@glidejs/glide/src/components/html';

// fix for correct work glide.update() until fix PR open https://github.com/glidejs/glide/pull/457
export default function HtmlFix (Glide, Components, Events) {
  const HtmlFix1 = Html(Glide, Components, Events);
  Events.on('update', () => {
      HtmlFix1.mount();
  });
  return HtmlFix1;
}

// usage
// let glide = new Glide(element, options);
// glide.mount({Html: HtmlFix})