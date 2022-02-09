import { redirect } from 'remix';

export function loader({ request }) {
  let languageHeader = request.headers.get('accept-language');
  let locale = languageHeader?.split(',')[0] || 'en';
  let language = locale.split('-')[0];

  if (!['en', 'es'].includes(language)) {
    language = 'en';
  }

  return redirect(`/${language}`);
}
