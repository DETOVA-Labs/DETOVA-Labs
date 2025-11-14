import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function ContributorPage() {
  return (
    <div className="flex flex-col">
      {/* Back Button */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-[var(--border-color)]">
        <div className="container mx-auto max-w-4xl">
          <Link
            href="/"
            className="inline-flex items-center text-[var(--silver)] hover:text-[var(--acid-lime)] transition-colors"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-5xl font-bold mb-4">Detova Labs Contributor Agreement</h1>
          <p className="text-[var(--silver)] mb-2">(Internship)</p>
          <p className="text-[var(--silver)] mb-12">Last updated: November 11, 2025</p>

          <Card className="p-8 bg-[var(--slate)] border-[var(--border-color)]">
            <div className="prose prose-invert prose-lg max-w-none text-[var(--silver)] space-y-6">
              <p>
                This agreement ("Agreement") is between you ("Contributor" or "You") and Detova Labs ("Detova," "we," or "us"). By applying to and accepting a position in the Detova Labs Internship Program (the "Program"), you agree to these terms.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">1. The Program</h2>
              <p>
                The Program is a 4-month, remote, unpaid educational and portfolio-building experience. You will contribute to real-world projects under the guidance of our core team.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">2. Compensation & Benefits</h2>
              <p className="font-semibold text-[var(--off-white)]">No Salary:</p>
              <p>
                This is an unpaid internship. You will not receive a salary, hourly wage, or guaranteed payment during the Program.
              </p>

              <p className="font-semibold text-[var(--off-white)] mt-4">Deferred Revenue Share:</p>
              <p>
                Detova Labs may, <em>at its sole discretion</em>, offer a deferred revenue share to Contributors who make significant contributions to revenue-generating products. This is not guaranteed and is determined on a case-by-case basis. Any revenue share will be governed by a separate agreement.
              </p>

              <p className="font-semibold text-[var(--off-white)] mt-4">On-Chain Proof (Contributor NFT):</p>
              <p>
                Upon successful completion of the Program, you will receive a Contributor NFT as verifiable proof of your work. This NFT is for portfolio purposes only and does not represent ownership, equity, or any financial interest in Detova Labs.
              </p>

              <p className="font-semibold text-[var(--off-white)] mt-4">Access to Tools:</p>
              <p>
                You will have access to Detova Labs' internal tools and resources during the Program to facilitate your work.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">3. Intellectual Property</h2>
              <p className="font-semibold text-[var(--off-white)]">Assignment of Rights:</p>
              <p>
                You agree that all work product, code, designs, content, and intellectual property you create during the Program ("Contributions") are the sole and exclusive property of Detova Labs. You assign all rights, title, and interest in your Contributions to Detova Labs.
              </p>

              <p className="font-semibold text-[var(--off-white)] mt-4">Portfolio Use:</p>
              <p>
                You retain the right to showcase your Contributions in your personal portfolio, provided you do not disclose confidential information or proprietary processes.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">4. Confidentiality</h2>
              <p>
                You agree to keep all confidential information, trade secrets, and proprietary processes of Detova Labs confidential, both during and after the Program. This includes, but is not limited to, business strategies, product roadmaps, and internal communications.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">5. No Employment Relationship</h2>
              <p>
                This Program does not create an employment relationship. You are not an employee of Detova Labs and are not entitled to employee benefits, including health insurance, retirement plans, or paid time off.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">6. Conduct & Performance</h2>
              <p>
                You agree to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Maintain professional conduct at all times</li>
                <li>Meet agreed-upon deadlines and deliverables</li>
                <li>Communicate regularly with your mentor and team</li>
                <li>Respect the intellectual property and work of others</li>
                <li>Follow all policies and guidelines provided by Detova Labs</li>
              </ul>
              <p className="mt-4">
                Detova Labs reserves the right to terminate your participation in the Program at any time if you fail to meet these expectations.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">7. Termination</h2>
              <p>
                Either party may terminate this Agreement at any time with written notice. Upon termination:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You must immediately return all Detova Labs property and materials</li>
                <li>You must cease using Detova Labs' internal tools and resources</li>
                <li>Your confidentiality obligations continue indefinitely</li>
                <li>Detova Labs retains all rights to your Contributions</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">8. No Guarantee of Future Employment</h2>
              <p>
                Participation in the Program does not guarantee future employment, contract work, or any ongoing relationship with Detova Labs.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">9. Indemnification</h2>
              <p>
                You agree to indemnify and hold harmless Detova Labs, its officers, directors, employees, and affiliates from any claims, damages, losses, or expenses arising from your participation in the Program or your breach of this Agreement.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">10. Disclaimer of Warranties</h2>
              <p>
                The Program is provided "AS IS" without any warranties. Detova Labs makes no guarantees regarding the educational value, career advancement, or any other benefits you may receive from the Program.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">11. Limitation of Liability</h2>
              <p>
                Detova Labs shall not be liable for any direct, indirect, incidental, special, or consequential damages arising from your participation in the Program.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">12. Governing Law</h2>
              <p>
                This Agreement shall be governed by the laws of the United States, without regard to conflict of law principles.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">13. Entire Agreement</h2>
              <p>
                This Agreement constitutes the entire agreement between you and Detova Labs regarding the Program and supersedes all prior agreements or understandings.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">14. Amendments</h2>
              <p>
                Detova Labs reserves the right to modify this Agreement at any time. Material changes will be communicated to active Contributors.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">15. Acknowledgment</h2>
              <p>
                By submitting an internship application, you acknowledge that you have read, understood, and agree to be bound by this Contributor Agreement.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">16. Contact</h2>
              <p>
                Questions about this Agreement? Contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: <a href="mailto:hello@detovalabs.xyz" className="text-[var(--acid-lime)] hover:underline">hello@detovalabs.xyz</a></li>
                <li>By visiting: <Link href="/contact" className="text-[var(--acid-lime)] hover:underline">/contact</Link></li>
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}