import { type SVGProps } from 'react'
import { cn } from '../lib/utils'

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-10 w-10', className)}
      {...props}
    >
      {/* Outer rounded shape */}
      <path
        d="M262 67H144C102 67 67 101 67 144V367C67 410 102 445 145 445H368C411 445 445 410 445 367V262"
        stroke="currentColor"
        strokeWidth="32"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top-right circle */}
      <circle
        cx="405"
        cy="110"
        r="65"
        stroke="currentColor"
        strokeWidth="32"
      />

      {/* Center flower */}
      <circle
        cx="230"
        cy="288"
        r="42"
        stroke="currentColor"
        strokeWidth="20"
      />

      {/* Top-left petal */}
      <path
        d="M207 261C191 249 173 234 153 214C137 198 132 181 143 178C157 174 180 187 197 204C213 220 221 239 222 258"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Top-right petal */}
      <path
        d="M252 260C255 239 264 218 281 201C299 184 321 174 334 181C345 188 337 204 321 220C302 239 280 252 255 261"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom-left petal */}
      <path
        d="M207 313C190 318 171 330 153 348C137 364 132 382 143 389C156 397 179 385 196 368C213 351 221 332 222 314"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Bottom-right petal */}
      <path
        d="M253 313C258 334 267 352 284 369C301 386 323 396 334 389C345 382 337 365 321 348C303 330 280 318 255 313"
        stroke="currentColor"
        strokeWidth="20"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}