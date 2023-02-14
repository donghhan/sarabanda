import requests
from bs4 import BeautifulSoup


def get_total_pages(keyword):
    url = f"https://th.jobsdb.com/th/search-jobs/{keyword}"
    r = requests.get(url)

    if r.status_code != 200:
        raise ValueError("Internal server error. Try later.")

    soup = BeautifulSoup(r.text, "html.parser")
    pagination = soup.select_one("select#pagination")
    total_pages = int(pagination.find_all("option", recursive=False)[-1].text)
    return total_pages


def parser(keyword):
    base_url = "https://th.jobsdb.com/th/search-jobs"
    results = []
    total_pages = get_total_pages(keyword)

    for i in range(total_pages):
        url = f"{base_url}/{keyword}/{i + 1}"
        r = requests.get(url)

        if r.status_code != 200:
            raise ValueError("Internal server error. Try later.")

        soup = BeautifulSoup(r.text, "html.parser")
        jobs = soup.select('div[data-automation="jobListing"]')

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
                # job_description = job_post.find_all(
                #     "li", attrs={"class": "sx2jih0 zcydq86i"}
                # )
                # if job_description:
                #     job_description = job_description.text
                # else:
                #     job_description = None

                data = {
                    "job_title": job_title,
                    "job_url": job_url,
                    "company_name": company_name,
                    "location": location,
                    "company_logo": company_logo,
                    # "job_description": job_description,
                }

                results.append(data)

        return results
