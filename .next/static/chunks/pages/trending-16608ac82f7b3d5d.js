(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[827],{30253:function(n,t,e){(window.__NEXT_P=window.__NEXT_P||[]).push(["/trending",function(){return e(4269)}])},96835:function(n,t,e){"use strict";e.d(t,{Z:function(){return s}});var i=e(67294),o=e(60119);function s(n){let{cursor:t,stop:e,offset:s,onLoadMore:r,onLoadMoreByOffset:u}=n,a=(0,i.useRef)(null),d=(0,i.useCallback)(()=>{0===(0,o.rA)()&&window.scrollTo(0,(0,o.cx)()-1)},[]),l=(0,i.useCallback)(async()=>{t&&r&&t!==a.current&&(a.current=t,await r(t),d())},[t,r,d]),b=(0,i.useCallback)(async()=>{!e&&s&&u&&s!==a.current&&(a.current=s,await u(s),d())},[s,u,d,e]),c=(0,i.useCallback)(()=>{let n=(0,o.rA)();n<window.screen.height&&(l(),b())},[l,b]);(0,i.useEffect)(()=>(window.addEventListener("scroll",c),()=>{window.removeEventListener("scroll",c)}),[c])}},17426:function(n,t,e){"use strict";e.d(t,{E4:function(){return $},Hz:function(){return f},KH:function(){return S},QU:function(){return x},WO:function(){return y},YR:function(){return w},Zr:function(){return h},hc:function(){return I},l5:function(){return g},ss:function(){return P},wL:function(){return Z},zL:function(){return v}});var i=e(7297),o=e(58585);function s(){let n=(0,i.Z)(["\n  query GetPost($id: String!) {\n    post(id: $id) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      subs_count\n      released_at\n      created_at\n      updated_at\n      liked\n      tags {\n        tag {\n          name\n        }\n      }\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n        profile {\n          id\n          bio\n          profile_name\n          thumbnail\n        }\n      }\n      subs {\n        id\n        text\n        likes\n        has_replies\n        deleted\n        level\n        reply\n        created_at\n        updated_at\n\n        upvotes\n        replies {\n          id\n          text\n          has_replies\n          created_at\n          updated_at\n        }\n        replies_count\n        user {\n          id\n          username\n          profile {\n            id\n            bio\n            profile_name\n            thumbnail\n          }\n        }\n      }\n    }\n  }\n"]);return s=function(){return n},n}function r(){let n=(0,i.Z)(["\n  query GetPosts($cursor: String, $username: String, $istemp: Boolean) {\n    posts(cursor: $cursor, username: $username, istemp: $istemp) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      tags {\n        tag {\n          name\n        }\n      }\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return r=function(){return n},n}function u(){let n=(0,i.Z)(["\n  query RecentPosts($cursor: String, $limit: Int) {\n    recentPosts(cursor: $cursor, limit: $limit) {\n      id\n      title\n\n      thumbnail\n      likes\n      views\n      is_temp\n      postbody\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return u=function(){return n},n}function a(){let n=(0,i.Z)(["\n  query TrendingPosts(\n    $offset: Int\n    $limit: Int\n    $timeframe: String\n    $from: Date\n    $to: Date\n  ) {\n    trendingPosts(\n      offset: $offset\n      limit: $limit\n      timeframe: $timeframe\n      from: $from\n      to: $to\n    ) {\n      id\n      title\n      thumbnail\n      likes\n      postbody\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return a=function(){return n},n}function d(){let n=(0,i.Z)(["\n  mutation CreatePost(\n    $body: String!\n    $title: String!\n    $thumbnail: String\n    $postbody: String\n    $tags: [String]\n    $is_temp: Boolean\n    $is_private: Boolean\n    $bookTitle: String\n    $bookContent: String\n    $bookUrl: String\n    $bookIsbn: String\n    $bookAuthors: [String]\n  ) {\n    createPost(\n      body: $body\n      title: $title\n      tags: $tags\n      thumbnail: $thumbnail\n      postbody: $postbody\n      is_temp: $is_temp\n      is_private: $is_private\n      bookTitle: $bookTitle\n      bookContent: $bookContent\n      bookUrl: $bookUrl\n      bookIsbn: $bookIsbn\n      bookAuthors: $bookAuthors\n    ) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      postbody\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n    }\n  }\n"]);return d=function(){return n},n}function l(){let n=(0,i.Z)(["\n  query ReloadComments($id: String!) {\n    post(id: $id) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      subs_count\n      released_at\n      created_at\n      updated_at\n      liked\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n        updated_at\n      }\n    }\n  }\n"]);return l=function(){return n},n}function b(){let n=(0,i.Z)(["\n  query SearchPosts($searchInput: String) {\n    searchPosts(searchInput: $searchInput) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      bookInfo {\n        bookTitle\n        bookContent\n        bookUrl\n        bookIsbn\n        bookAuthors\n      }\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return b=function(){return n},n}function c(){let n=(0,i.Z)(["\n  mutation EditPost(\n    $id: String!\n    $title: String\n    $body: String\n    $thumbnail: String\n    $tags: [String]\n    $is_temp: Boolean\n    $is_private: Boolean\n    $postbody: String\n  ) {\n    editPost(\n      id: $id\n      title: $title\n      body: $body\n      tags: $tags\n      is_temp: $is_temp\n      thumbnail: $thumbnail\n      is_private: $is_private\n      postbody: $postbody\n    ) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return c=function(){return n},n}function m(){let n=(0,i.Z)(["\n  mutation RemovePost($id: String!) {\n    removePost(id: $id)\n  }\n"]);return m=function(){return n},n}function k(){let n=(0,i.Z)(["\n  mutation LikePost($id: String!) {\n    likePost(id: $id) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return k=function(){return n},n}function p(){let n=(0,i.Z)(["\n  mutation UnlikePost($id: String!) {\n    unlikePost(id: $id) {\n      id\n      title\n      body\n      thumbnail\n      likes\n      views\n      is_temp\n      is_private\n      released_at\n      created_at\n      updated_at\n      liked\n      user {\n        id\n        username\n      }\n      subs {\n        id\n        text\n      }\n      subs_count\n    }\n  }\n"]);return p=function(){return n},n}function _(){let n=(0,i.Z)(["\n  mutation UploadImageToCloudinary($body: String!, $width: Int!, $height: Int!) {\n    uploadImage(body: $body, width: $width, height: $height) {\n      public_id\n      url\n    }\n  }\n"]);return _=function(){return n},n}let f=(0,o.ZP)(s()),$=(0,o.ZP)(r()),g=(0,o.ZP)(u()),h=(0,o.ZP)(a()),v=(0,o.ZP)(d()),y=(0,o.ZP)(l()),P=(0,o.ZP)(b()),x=(0,o.ZP)(c()),w=(0,o.ZP)(m()),Z=(0,o.ZP)(k()),I=(0,o.ZP)(p()),S=(0,o.ZP)(_())},4269:function(n,t,e){"use strict";e.r(t),e.d(t,{default:function(){return P}});var i=e(85893),o=e(67294),s=e(70318),r=e(47034),u=e(79352),a=e(86548),d=e(2962),l=e(12045),b=e(3410),c=e(14490),m=e(86381),k=e(46829),p=e(9473),_=e(96835),f=e(17426),$=e(63750),g=e(8193),h=e(51649),v=e(5434),y=e(96758);function P(){let{data:n,loading:t}=function(){var n,t;let e=(0,p.v9)(n=>n.core.timestamp),{data:i,loading:s,fetchMore:r}=(0,k.useQuery)(f.Zr,{variables:{limit:24,timeframe:"month",from:(null==e?void 0:e.from)?null==e?void 0:e.from:"",to:(null==e?void 0:e.to)?null==e?void 0:e.to:""},notifyOnNetworkStatusChange:!0}),[u,a]=(0,o.useState)(!1),d=(0,o.useCallback)(n=>{r({variables:{cursor:n,limit:24},updateQuery:(n,t)=>{let{fetchMoreResult:e}=t;return e?(0===e.trendingPosts.length&&a(!0),{trendingPosts:[...null==n?void 0:n.trendingPosts,...null==e?void 0:e.trendingPosts]}):n}})},[r]),l=null===(n=null==i?void 0:i.trendingPosts[(null==i?void 0:null===(t=i.trendingPosts)||void 0===t?void 0:t.length)-1])||void 0===n?void 0:n.id;return(0,_.Z)({cursor:l,onLoadMore:d}),{data:i,loading:s,isFinished:u}}();return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(d.PB,{...(0,l.q)({title:"Book Review Trading",description:"책 리뷰 트렌딩 페이지"})}),(0,i.jsx)(a.X,{children:(0,i.jsxs)(s.k,{as:"div",className:"pt-[2rem]",children:[(0,i.jsx)(c.$t,{className:"col-span-2 mmd:hidden",children:(0,i.jsxs)("div",{className:"sticky top-24",children:[(0,i.jsx)(r.Z,{primaryItems:[{icon:(0,i.jsx)(u.iEv,{}),text:"포스트",to:"/",sub:["/search","/search/[query]","/trending"]},{icon:(0,i.jsx)(g.pMA,{}),text:"게시판",to:"/post"},{icon:(0,i.jsx)($.ra4,{}),text:"태그",to:"/tags"}],secondaryItems:[{icon:(0,i.jsx)(u.UeR,{}),text:"Trending tags",to:"/Trending tags"}]}),(0,i.jsx)(m.Z,{})]})}),(0,i.jsx)(c.LN,{className:"col-span-8 mmd:col-span-12",first:(0,i.jsx)(c.s2,{children:(0,i.jsx)(y.Z,{title:"트렌딩 포스트",primaryItems:[{svg:(0,i.jsx)(h.xps,{}),name:"최신",href:"/"},{svg:(0,i.jsx)(v.w79,{}),name:"트렌딩",href:"/trending"}]})}),second:(0,i.jsx)(c.so,{children:(0,i.jsx)(s.Y,{className:"mt-[1rem]",children:(0,i.jsx)(b.Z,{posts:(null==n?void 0:n.trendingPosts)||[],loading:!n||t})})})})]})})]})}}},function(n){n.O(0,[228,260,617,937,662,401,86,866,13,78,780,73,424,548,543,562,774,888,179],function(){return n(n.s=30253)}),_N_E=n.O()}]);