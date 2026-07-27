import Hero from "../../../components/Hero";
import { InquiryItem } from "../../../components/Item";
import { Link, useLocation, useNavigate } from "react-router";
import { useGuestInquiryQuery } from "../../../hook/guest/useGuestQuery";
import { useEffect } from "react";

export default function GuestInquiry() {
  const navigate = useNavigate();
  const location = useLocation();
  const form = location.state?.form;

  const { data: inquiries } = useGuestInquiryQuery(form);

  useEffect(() => {
    if (!form) {
      navigate("/guest", { replace: true });
    }
  }, [form, navigate]);

  if (!inquiries) return null;

  console.log(inquiries);
  return (
    <>
      <Hero
        title="문의조회 결과"
        subTitle="입력하신 정보와 일치하는 문의를 찾습니다."
      />

      <section className="max-w-7xl p-4 mx-auto py-5">
        <ul className="flex flex-col gap-5">
          {inquiries.map((inquiry: Inquiry) => (
            <li key={inquiry.id}>
              <InquiryItem inquiry={inquiry} />
            </li>
          ))}
        </ul>

        <div className="flex gap-4 mt-5">
          <Link
            to="/guest"
            className="w-fit text-center py-2 px-4 border border-(--navy) bg-(--surface) hover:bg-(--navy) hover:text-(--bg) text-sm"
          >
            다른 정보 조회하기
          </Link>
          <Link
            to="/inquiry"
            className="w-fit text-center py-2 px-4 border border-(--brass) bg-(--brass) text-(--bg) text-sm"
          >
            새 문의 남기기
          </Link>
        </div>
      </section>
    </>
  );
}
