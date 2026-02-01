'use client'
import { FaStethoscope, FaGraduationCap, FaCertificate, FaHospital, FaUserMd, FaClock, FaCalendarAlt, FaCheckCircle, FaCommentDots } from "react-icons/fa"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from 'next/link';
type Doctor = {
  name: string
  hospital: string
  specialty: string
  experience: string
  education: string[]
  certifications: string[]
  languages: string[]
  consultationFee: string
  rating: number
  totalReviews: number
  about: string
  expertise: string[]
}

export default function Appointment() {
  const params = useParams()
  const router = useRouter()
  const [selectedDate, setSelectedDate] = useState("")
  const [reason, setReason] = useState("")
  const [patientName, setPatientName] = useState("")
  const [contactNumber, setContactNumber] = useState("")
  const [isNewPatient, setIsNewPatient] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const doctorId =
    typeof params.doctorId === "string"
      ? params.doctorId
      : params.doctorId?.[0]

       const doctors: Record<string, Doctor> = {d1: {
      name: "Dr. Adrian James F. Bona",
      hospital: "Barangay Calauag Health Center",
      specialty: "General Practice & Family Medicine",
      experience: "12 years",
      education: [
        "Doctor of Medicine - University of the Philippines Manila",
        "Bachelor of Science in Biology - Ateneo de Manila University"
      ],
      certifications: [
        "Philippine Medical Association Certified",
        "Family Medicine Board Certified",
        "Basic Life Support (BLS) Certified"
      ],
      languages: ["English", "Filipino", "Bicolano"],
      consultationFee: "₱500",
      rating: 4.8,
      totalReviews: 234,
      about: "Dr. Bona is a dedicated family physician with over a decade of experience in primary care. He specializes in preventive medicine, chronic disease management, and provides comprehensive healthcare for patients of all ages.",
      expertise: ["Preventive Care", "Chronic Disease Management", "Pediatric Care", "Geriatric Care", "Health Screenings"]
    },
    d2: {
      name: "Dr. Maria Elena Cruz",
      hospital: "Barangay Calauag Health Center",
      specialty: "Pediatrics",
      experience: "8 years",
      education: [
        "Doctor of Medicine - Far Eastern University",
        "Pediatric Residency - Philippine Children's Medical Center"
      ],
      certifications: [
        "Philippine Pediatric Society Member",
        "Pediatric Advanced Life Support (PALS) Certified",
        "Neonatal Resuscitation Program (NRP) Certified"
      ],
      languages: ["English", "Filipino"],
      consultationFee: "₱600",
      rating: 4.9,
      totalReviews: 189,
      about: "Dr. Cruz is a compassionate pediatrician committed to providing quality healthcare for children from infancy through adolescence. She focuses on developmental monitoring and preventive care.",
      expertise: ["Newborn Care", "Immunizations", "Growth Monitoring", "Common Childhood Illnesses", "Nutrition Counseling"]
    },
    d3: {
      name: "Dr. Jonathan Reyes",
      hospital: "Naga City Health Office",
      specialty: "Internal Medicine",
      experience: "15 years",
      education: [
        "Doctor of Medicine - University of Santo Tomas",
        "Internal Medicine Residency - Philippine General Hospital"
      ],
      certifications: [
        "Philippine College of Physicians Fellow",
        "Hypertension Specialist Certification",
        "Diabetes Management Certification"
      ],
      languages: ["English", "Filipino", "Bicolano"],
      consultationFee: "₱800",
      rating: 4.7,
      totalReviews: 312,
      about: "Dr. Reyes specializes in the diagnosis and treatment of adult diseases, with particular expertise in cardiovascular health and metabolic disorders.",
      expertise: ["Hypertension", "Diabetes Management", "Heart Disease", "Respiratory Conditions", "Infectious Diseases"]
    },
    d4: {
      name: "Dr. Liza Santos",
      hospital: "Naga City Health Office",
      specialty: "Obstetrics & Gynecology",
      experience: "10 years",
      education: [
        "Doctor of Medicine - Bicol University College of Medicine",
        "OB-GYN Residency - Southern Philippines Medical Center"
      ],
      certifications: [
        "Philippine Obstetrical and Gynecological Society Member",
        "Advanced Obstetric Life Support",
        "Family Planning Counselor Certified"
      ],
      languages: ["English", "Filipino", "Bicolano"],
      consultationFee: "₱700",
      rating: 4.9,
      totalReviews: 267,
      about: "Dr. Santos provides comprehensive women's healthcare services including prenatal care, family planning, and gynecological consultations with a patient-centered approach.",
      expertise: ["Prenatal Care", "Family Planning", "Women's Health", "High-Risk Pregnancy", "Reproductive Health"]
    },
    d5: {
      name: "Dr. Catherine Lim",
      hospital: "Barangay Concepcion Grande Health Center",
      specialty: "Dermatology",
      experience: "6 years",
      education: [
        "Doctor of Medicine - Manila Central University",
        "Dermatology Residency - St. Luke's Medical Center"
      ],
      certifications: [
        "Philippine Dermatological Society Member",
        "Cosmetic Dermatology Certified",
        "Laser Treatment Specialist"
      ],
      languages: ["English", "Filipino", "Mandarin"],
      consultationFee: "₱900",
      rating: 4.8,
      totalReviews: 156,
      about: "Dr. Lim specializes in medical and cosmetic dermatology, offering treatments for various skin conditions and aesthetic concerns.",
      expertise: ["Acne Treatment", "Skin Allergies", "Eczema & Psoriasis", "Anti-aging Treatments", "Skin Cancer Screening"]
    },
    d6: {
      name: "Dr. Mark Dela Rosa",
      hospital: "Barangay Concepcion Grande Health Center",
      specialty: "Orthopedics",
      experience: "14 years",
      education: [
        "Doctor of Medicine - University of the Philippines Manila",
        "Orthopedic Surgery Residency - Philippine Orthopedic Center"
      ],
      certifications: [
        "Philippine Orthopedic Association Fellow",
        "Sports Medicine Specialist",
        "Arthroscopy Certified"
      ],
      languages: ["English", "Filipino"],
      consultationFee: "₱1,000",
      rating: 4.7,
      totalReviews: 198,
      about: "Dr. Dela Rosa is an experienced orthopedic surgeon specializing in musculoskeletal conditions, sports injuries, and joint disorders.",
      expertise: ["Sports Injuries", "Fracture Care", "Joint Pain", "Arthritis Treatment", "Back & Spine Problems"]
    },
    d7: {
      name: "Dr. Angela Bautista",
      hospital: "Barangay Triangulo Health Center",
      specialty: "Psychiatry",
      experience: "9 years",
      education: [
        "Doctor of Medicine - Ateneo School of Medicine",
        "Psychiatry Residency - National Center for Mental Health"
      ],
      certifications: [
        "Philippine Psychiatric Association Member",
        "Cognitive Behavioral Therapy Certified",
        "Child & Adolescent Psychiatry Specialist"
      ],
      languages: ["English", "Filipino"],
      consultationFee: "₱1,200",
      rating: 4.9,
      totalReviews: 143,
      about: "Dr. Bautista provides compassionate mental health care with expertise in treating anxiety, depression, and various psychiatric conditions.",
      expertise: ["Depression & Anxiety", "Stress Management", "ADHD", "Bipolar Disorder", "Psychotherapy"]
    },
    d8: {
      name: "Dr. Rafael Cruz",
      hospital: "Barangay Triangulo Health Center",
      specialty: "Cardiology",
      experience: "18 years",
      education: [
        "Doctor of Medicine - University of Santo Tomas",
        "Internal Medicine Residency - Philippine Heart Center",
        "Cardiology Fellowship - Philippine Heart Center"
      ],
      certifications: [
        "Philippine Heart Association Fellow",
        "Echocardiography Specialist",
        "Advanced Cardiac Life Support (ACLS) Instructor"
      ],
      languages: ["English", "Filipino"],
      consultationFee: "₱1,500",
      rating: 4.8,
      totalReviews: 289,
      about: "Dr. Cruz is a highly experienced cardiologist dedicated to preventing, diagnosing, and treating heart and cardiovascular conditions.",
      expertise: ["Heart Disease", "Hypertension", "ECG & Echocardiography", "Cardiac Rehabilitation", "Preventive Cardiology"]
    },
  }

  const doctor = doctorId ? doctors[doctorId] : null
   if (!doctor) return (
    <div className="min-h-screen bg-[#F2EFF9] flex items-center justify-center">
      <p className="text-lg text-[#3F2870]">Doctor not found</p>
    </div>
  )

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle appointment submission
    console.log({ selectedDate, reason, patientName, contactNumber, isNewPatient })
    setIsSubmitted(true)
  }

  const handleMessageDoctor = () => {
    // Navigate to chat page - adjust the route as needed
    router.push('/mothers/chat');
  }

  return (<main className="min-h-screen bg-[#F2EFF9] px-4 py-8 md:px-6 md:pt-24 pb-12">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3F2870] mb-2">Book an Appointment</h1>
          <p className="text-[#3F2870] opacity-80">Schedule your consultation with our healthcare professional</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Left Column - Doctor Information */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Doctor Profile Card */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-[#3F2870]">
              <div className="bg-[#3F2870] p-6 text-white">
                <div className="flex items-start gap-6">
                  <div className="flex-shrink-0">
                    <div className="h-24 w-24 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-2 border-white/30">
                      <FaUserMd size={48} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">{doctor.name}</h2>
                    <p className="text-[#E6E1F2] font-medium mb-3">{doctor.specialty}</p>
                    <div className="flex items-center gap-2 mb-2">
                      <FaHospital className="text-[#E6E1F2]" />
                      <span className="text-sm">{doctor.hospital}</span>
                    </div>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <FaCheckCircle className="text-[#E6E1F2]" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-300">★</span>
                        <span>{doctor.rating} ({doctor.totalReviews} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                
                {/* About */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3F2870] mb-3">About</h3>
                  <p className="text-[#1B1530] leading-relaxed">{doctor.about}</p>
                </div>

                {/* Expertise */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3F2870] mb-3">Areas of Expertise</h3>
                  <div className="flex flex-wrap gap-2">
                    {doctor.expertise.map((item, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-[#E6E1F2] text-[#3F2870] rounded-full text-sm font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Education */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3F2870] mb-3 flex items-center gap-2">
                    <FaGraduationCap className="text-[#3F2870]" />
                    Education
                  </h3>
                  <ul className="space-y-2">
                    {doctor.education.map((edu, idx) => (
                      <li key={idx} className="text-[#1B1530] pl-6 relative before:content-['•'] before:absolute before:left-0 before:text-[#3F2870] before:font-bold">
                        {edu}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Certifications */}
                <div>
                  <h3 className="text-lg font-semibold text-[#3F2870] mb-3 flex items-center gap-2">
                    <FaCertificate className="text-[#3F2870]" />
                    Certifications & Memberships
                  </h3>
                  <ul className="space-y-2">
                    {doctor.certifications.map((cert, idx) => (
                      <li key={idx} className="text-[#1B1530] pl-6 relative before:content-['✓'] before:absolute before:left-0 before:text-[#3F2870] before:font-bold">
                        {cert}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Languages & Consultation Fee */}
                <div className="grid md:grid-cols-2 gap-4 pt-4 border-t border-[#E6E1F2]">
                  <div>
                    <h4 className="font-semibold text-[#3F2870] mb-2">Languages Spoken</h4>
                    <p className="text-[#1B1530]">{doctor.languages.join(", ")}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-[#3F2870] mb-2">Consultation Fee</h4>
                    <p className="text-2xl font-bold text-[#3F2870]">{doctor.consultationFee}</p>
                  </div>
                </div>

              </div>
            </div>
             </div>

          {/* Right Column - Appointment Form */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-[#3F2870] sticky top-24">
              
              {!isSubmitted ? (
                <>
                  <h3 className="text-xl font-bold text-[#3F2870] mb-6">Appointment Details</h3>
                  
                  <form onSubmit={handleSubmit} className="space-y-5">
                    
                    {/* Patient Name */}
                    <div>
                      <label className="block text-sm font-semibold text-[#3F2870] mb-2">
                        Patient Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={patientName}
                        onChange={(e) => setPatientName(e.target.value)}
                        placeholder="Enter full name"
                        className="w-full px-4 py-3 rounded-lg bg-[#E6E1F2] text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870] transition"
                      />
                    </div>

                    {/* Contact Number */}
                    <div>
                      <label className="block text-sm font-semibold text-[#3F2870] mb-2">
                        Contact Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        placeholder="+63 XXX XXX XXXX"
                        className="w-full px-4 py-3 rounded-lg bg-[#E6E1F2] text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870] transition"
                      />
                    </div>

                    {/* New Patient Checkbox */}
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        id="newPatient"
                        checked={isNewPatient}
                        onChange={(e) => setIsNewPatient(e.target.checked)}
                        className="h-4 w-4 text-[#3F2870] border-gray-300 rounded focus:ring-[#3F2870]"
                      />
                      <label htmlFor="newPatient" className="text-sm text-[#1B1530]">
                        I'm a new patient
                      </label>
                    </div>

                    {/* Date & Time */}
                    <div>
                      <label className="block text-sm font-semibold text-[#3F2870] mb-2 flex items-center gap-2">
                        <FaCalendarAlt className="text-[#3F2870]" />
                        Select Date & Time *
                      </label>
                      <select
                        required
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)}
                        className="w-full px-4 py-3 rounded-lg bg-[#E6E1F2] text-[#1B1530] outline-none focus:ring-2 focus:ring-[#3F2870] transition"
                      >
                        <option value="">Choose a slot</option>
                        <option value="2026-01-30-09:00">January 30, 2026 - 09:00 AM</option>
                        <option value="2026-01-30-13:30">January 30, 2026 - 01:30 PM</option>
                        <option value="2026-02-01-10:00">February 1, 2026 - 10:00 AM</option>
                        <option value="2026-02-01-14:00">February 1, 2026 - 02:00 PM</option>
                        <option value="2026-02-03-09:30">February 3, 2026 - 09:30 AM</option>
                        <option value="2026-02-03-15:00">February 3, 2026 - 03:00 PM</option>
                      </select>
                    </div>

                    {/* Reason for Appointment */}
                    <div>
                      <label className="block text-sm font-semibold text-[#3F2870] mb-2">
                        Reason for Appointment *
                      </label>
                      <textarea
                        required
                        rows={4}
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Please describe your symptoms or reason for consultation..."
                        className="w-full px-4 py-3 rounded-lg bg-[#E6E1F2] text-[#1B1530] placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#3F2870] transition resize-none"
                      />
                      <p className="text-xs text-[#3F2870] opacity-70 mt-1">
                        Include any relevant medical history or current medications
                      </p>
                    </div>

                    {/* Important Notes */}
                    <div className="bg-[#E6E1F2] border border-[#3F2870] rounded-lg p-4">
                      <h4 className="font-semibold text-[#3F2870] text-sm mb-2">Important Reminders:</h4>
                      <ul className="text-xs text-[#1B1530] space-y-1">
                        <li>• Arrive 15 minutes before your appointment</li>
                        <li>• Bring valid ID and insurance card (if applicable)</li>
                        <li>• Bring previous medical records if available</li>
                        <li>• Wear a face mask to the clinic</li>
                      </ul>
                    </div>

                    {/* Submit Button */}
                  <button
                      type="submit"
                      className="w-full bg-[#3F2870] text-white font-bold py-3.5 rounded-lg hover:opacity-90 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <FaClock />
                      Confirm Appointment
                    </button>
                    
                 

                    <p className="text-xs text-[#3F2870] opacity-70 text-center">
                      You will receive a confirmation via SMS/Email
                    </p>
                  </form>
                </>
              ) : (
                <>
                  {/* Success State */}
                  <div className="text-center space-y-6 animate-fadeIn">
                    {/* Animated Checkmark */}
                    <div className="flex justify-center">
                      <div className="relative">
                        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center animate-scaleIn">
                          <FaCheckCircle className="text-green-600 text-5xl animate-checkmark" />
                        </div>
                        <div className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-20"></div>
                      </div>
                    </div>

                    {/* Success Message */}
                    <div className="space-y-3">
                      <h3 className="text-2xl font-bold text-[#3F2870]">
                        Appointment Submitted!
                      </h3>
                      <p className="text-[#1B1530] leading-relaxed">
                        Your appointment with <span className="font-semibold text-[#3F2870]">{doctor.name}</span> has been successfully submitted.
                      </p>
                    </div>

                    {/* Appointment Summary */}
                    <div className="bg-[#E6E1F2] rounded-xl p-4 text-left space-y-2">
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-[#3F2870] font-semibold">Patient:</span>
                        <span className="text-sm text-[#1B1530] font-medium">{patientName}</span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-[#3F2870] font-semibold">Date & Time:</span>
                        <span className="text-sm text-[#1B1530] font-medium">
                          {selectedDate.split('-').slice(0, 3).join('-')}
                        </span>
                      </div>
                      <div className="flex justify-between items-start">
                        <span className="text-sm text-[#3F2870] font-semibold">Contact:</span>
                        <span className="text-sm text-[#1B1530] font-medium">{contactNumber}</span>
                      </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-900">
                        ✉️ A confirmation email and SMS has been sent to your contact details.
                      </p>
                    </div>

                    {/* Message Doctor Button */}
                      <Link href="/mothers/chats">
                       <button
                      onClick={handleMessageDoctor}
                      className="w-full bg-gradient-to-r from-[#3F2870] to-[#5a3d99] hover:from-[#5a3d99] hover:to-[#3F2870] text-white font-bold py-4 rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-3 group"
                    >
                      <FaCommentDots className="text-xl group-hover:scale-110 transition-transform" />
                      <span>Message {doctor.name.split(' ')[1]}</span>
                    </button></Link>
                   

                    {/* Secondary Actions */}
                    <div className="pt-4 space-y-2">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="w-full text-[#3F2870] font-semibold py-2 rounded-lg hover:bg-[#E6E1F2] transition-all text-sm"
                      >
                        Book Another Appointment
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
            </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes scaleIn {
          from {
            transform: scale(0);
          }
          to {
            transform: scale(1);
          }
        }

        @keyframes checkmark {
          0% {
            transform: scale(0) rotate(-45deg);
          }
          50% {
            transform: scale(1.2) rotate(0deg);
          }
          100% {
            transform: scale(1) rotate(0deg);
          }
        }

        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out;
        }

        .animate-scaleIn {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-checkmark {
          animation: checkmark 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) 0.2s both;
        }
      `}</style>
    </main>
  )
}