const Service = require('egg').Service;

class NewsService extends Service {
  async list() {
    // read config
    // const { serverUrl, pageSize } = this.config.news;

    // use build-in http client to GET hacker-news api
    // const { data: idList } = await this.ctx.curl(`${serverUrl}/topstories.json`, {
    //   data: {
    //     orderBy: '"$key"',
    //     startAt: `"${pageSize * (page - 1)}"`,
    //     endAt: `"${pageSize * page - 1}"`,
    //   },
    //   dataType: 'json',
    // });

    // parallel GET detail
    // const newsList = await Promise.all(
    //   Object.keys(idList).map(key => {
    //     const url = `${serverUrl}/item/${idList[key]}.json`;
    //     return this.ctx.curl(url, { dataType: 'json' });
    //   })
    // );
    // return newsList.map(res => res.data);
    const newList = {
        list: [
          { id: 1, title: 'this is news 1', url: '/news/1' },
          { id: 2, title: 'this is news 2', url: '/news/2' }
        ]
      };
    return newList
  }
}

module.exports = NewsService;