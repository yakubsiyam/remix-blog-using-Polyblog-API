import { getArticles } from '@polyblog/polyblog-js-client';
import { useLoaderData } from 'remix';

export const loader = async ({ params }) => {
  const { locale, slug } = params;

  const articles = await getArticles({
    // signup at https://www.polyblog.io/signup to get your blogId
    blogId: '4217f90b8eaa86551e7f7d55',
    locale,
    slugLocalized: slug,
  });

  const article = articles?.[0];
  return article;
};

export default function ArticlePage() {
  const article = useLoaderData();
  return (
    <div>
      {article && (
        <>
          <div
            style={{
              width: '100%',
              height: '400px',
              backgroundImage: `url(${article?.coverUrl})`,
              backgroundSize: 'cover',
            }}
            className="mb-5"
          >
            <h2 className="text-center pt-5">{article?.title}</h2>
            <h4 className="text-center pt-3">{article?.subtitle}</h4>
            <p className="text-center">
              <i>
                Posted by <span>{article?.author}</span> on{' '}
                <span>
                  {new Date(article?.creationTime).toLocaleDateString()}
                </span>
              </i>
            </p>
          </div>

          <style>
            {`article img {
                max-width: 512px;
                display: block;
                margin-left: auto;
                margin-right: auto;
              }`}
          </style>

          <article dangerouslySetInnerHTML={{ __html: article?.content }} />
        </>
      )}
    </div>
  );
}
