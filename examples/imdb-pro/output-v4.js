javascript:(function%20()%7Bconst%20hr=window.location.href;%20const%20nh=new%20URL(hr);%20let%20u=(nh.origin+nh.pathname);%20const%20im=u.indexOf('imdb.com');%20if%20(im%3C0)%7Bwindow.location='https://pro.imdb.com/name/nm2825198/?site_preference=normal';%20return;%7Dconst%20pr=u.indexOf('https://pro.imdb.com');%20if%20(pr===0)%7Bconst%20b=u.indexOf('boxoffice');%20const%20d=u.indexOf('details');%20const%20f=u.indexOf('filmmakers');%20const%20m=u.indexOf('images');%20const%20v=u.indexOf('videos');%20const%20bad=Math.max(b,%20d,%20f,%20m,%20v);%20if%20(bad%3E0)%7Bu=u.substring(0,%20bad);%7Dwindow.location=u.replace('https://pro',%20'https://www');%20return;%7Dconst%20t=u.indexOf('title/tt')%3E0;%20const%20n=u.indexOf('name/nm')%3E0;%20if%20(t)%7Bconst%20c=u.indexOf('combined');%20const%20fi=u.indexOf('filmmakers');%20const%20fu=u.indexOf('fullcredits');%20const%20r=u.indexOf('reference');%20const%20bad=Math.max(c,%20fi,%20fu,%20r);%20if%20(bad%3E0)%7Bu=u.substring(0,%20bad);%7D%7D%20else%20if%20(n)%7Bconst%20m=u.indexOf('mediaindex');%20const%20bad=Math.max(m);%20if%20(bad%3E0)%7Bu=u.substring(0,%20bad);%7D%7D%20window.location=u.replace(/https:%5C/%5C/%5Ba-z%5D+/,%20'https://pro');%20%7D)();