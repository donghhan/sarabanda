import requests
from bs4 import BeautifulSoup


class JobsDBParser:
    base_url = "https://th.jobsdb.com/th/search-jobs"

    def __init__(self, keyword, page):
        self.keyword: str = keyword
        self.page: int = page

    def parser(self):
        url = f"{self.base_url}/{self.keyword}/{self.page}"
        r = requests.get(url, auth=("user", "pass"))

        if r.status_code != 200:
            raise ValueError("Cannot parse.")

        soup = BeautifulSoup(r.text, "html.parser")
        jobs = soup.select('div[data-automation="jobListing"]')

        results = []

        for job_lists in jobs:
            job_posts = job_lists.select("article")

            for job_post in job_posts:
                link = job_post.find(attrs={"target": "_top"})
                job_url = f'https://th.jobsdb.com{link.get("href")}'
                job_title = link.find("span").text
                company_name = job_post.find(
                    attrs={"data-automation": "jobCardCompanyLink"}
                ).text
                location = job_post.find(
                    attrs={"data-automation": "jobCardLocationLink"}
                ).text
                company_logo_src = job_post.find(
                    "img", attrs={"class": "sx2jih0 rqoqz6"}
                )
                if company_logo_src:
                    company_logo = company_logo_src.get("src")
                else:
                    company_logo = "N/A"

                data = {
                    "job_title": job_title,
                    "job_url": job_url,
                    "company_name": company_name,
                    "location": location,
                    "company_logo": company_logo,
                }

                results.append(data)

        return results


a = JobsDBParser("frontend", 1).parser()
print(a)
