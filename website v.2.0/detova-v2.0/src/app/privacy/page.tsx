import { Card } from "@/components/ui/card"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
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
          <h1 className="text-5xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-[var(--silver)] mb-12">Last updated: November 11, 2025</p>

          <Card className="p-8 bg-[var(--slate)] border-[var(--border-color)]">
            <div className="prose prose-invert prose-lg max-w-none text-[var(--silver)] space-y-6">
              <p>
                Detova Labs ("us", "we", or "our") operates the <a href="https://detovalabs.xyz" className="text-[var(--acid-lime)] hover:underline">https://detovalabs.xyz</a> website (the "Service").
              </p>
              <p>
                This page informs you of our policies regarding the collection, use, and disclosure of personal data when you use our Service and the choices you have associated with that data.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">1. Information Collection and Use</h2>
              <p>
                We collect several different types of information for various purposes to provide and improve our Service to you.
              </p>

              <h3 className="text-xl font-bold text-[var(--off-white)] mt-6 mb-3">Types of Data Collected</h3>
              
              <div className="pl-4">
                <p className="font-semibold text-[var(--off-white)]">Personal Data:</p>
                <p>
                  While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Email address</li>
                  <li>Name</li>
                  <li>Cookies and Usage Data</li>
                </ul>

                <p className="font-semibold text-[var(--off-white)] mt-4">Usage Data:</p>
                <p>
                  We may also collect information on how the Service is accessed and used ("Usage Data"). This Usage Data may include information such as your computer's Internet Protocol address (e.g., IP address), browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages, and other diagnostic data.
                </p>

                <p className="font-semibold text-[var(--off-white)] mt-4">Application Data:</p>
                <p>
                  When you apply for our Internship Program, we collect information you provide, such as your name, email, portfolio links, and responses. This is stored securely in our Firestore database.
                </p>

                <p className="font-semibold text-[var(--off-white)] mt-4">Contact Data:</p>
                <p>
                  When you contact us via our contact form, we collect your name, email, and message. This is stored securely in our Firestore database.
                </p>

                <p className="font-semibold text-[var(--off-white)] mt-4">AI Utility Data:</p>
                <p>
                  When you use our AI Utilities (Pitch Polisher, Resume Heat Check), we process the text you input to provide the service via the Gemini API. We do not store this input data in our database after the request is processed.
                </p>
              </div>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">2. Use of Data</h2>
              <p>Detova Labs uses the collected data for various purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our Service</li>
                <li>To notify you about changes to our Service</li>
                <li>To allow you to participate in interactive features of our Service when you choose to do so</li>
                <li>To provide customer support</li>
                <li>To gather analysis or valuable information so that we can improve our Service</li>
                <li>To monitor the usage of our Service</li>
                <li>To detect, prevent and address technical issues</li>
                <li>To process internship applications and contact form submissions</li>
                <li>To send you newsletters and marketing communications (with your consent)</li>
              </ul>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">3. Data Storage and Security</h2>
              <p>
                Your data is stored in Google Firebase Firestore, a secure cloud database service. We implement industry-standard security measures to protect your personal information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">4. Your Rights</h2>
              <p>You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at <a href="mailto:hello@detovalabs.xyz" className="text-[var(--acid-lime)] hover:underline">hello@detovalabs.xyz</a>.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">5. Third-Party Services</h2>
              <p>We use the following third-party services:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Firebase (Google):</strong> For data storage and authentication</li>
                <li><strong>Gemini API (Google):</strong> For AI-powered utilities</li>
              </ul>
              <p className="mt-4">
                These services have their own privacy policies and we encourage you to review them.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">6. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>

              <h2 className="text-2xl font-bold text-[var(--off-white)] mt-8 mb-4">7. Contact Us</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact us:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>By email: <a href="mailto:hello@detovalabs.xyz" className="text-[var(--acid-lime)] hover:underline">hello@detovalabs.xyz</a></li>
                <li>By visiting this page on our website: <Link href="/contact" className="text-[var(--acid-lime)] hover:underline">/contact</Link></li>
              </ul>
            </div>
          </Card>
        </div>
      </section>
    </div>
  )
}