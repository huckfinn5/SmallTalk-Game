| package |
package := Package name: 'Lights Out Game'.
package paxVersion: 1;
	basicComment: ''.


package classNames
	add: #LightsOutBoard;
	add: #LightsOutCell;
	add: #LightsOutCellView;
	add: #LightsOutGame;
	yourself.

package binaryGlobalNames: (Set new
	yourself).

package globalAliases: (Set new
	yourself).

package setPrerequisites: (IdentitySet new
	add: '..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\Base\Dolphin';
	add: '..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Base\Dolphin MVP Base';
	add: '..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\MVP\Models\Value\Dolphin Value Models';
	add: '..\Documents\Dolphin Smalltalk 7\Core\Object Arts\Dolphin\IDE\Base\Internal Bitmaps and Icons';
	yourself).

package!

"Class Definitions"!

Object subclass: #LightsOutBoard
	instanceVariableNames: 'cells'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Presenter subclass: #LightsOutCell
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
Shell subclass: #LightsOutGame
	instanceVariableNames: 'cellPresenters'
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!
View subclass: #LightsOutCellView
	instanceVariableNames: ''
	classVariableNames: ''
	poolDictionaries: ''
	classInstanceVariableNames: ''!

"Global Aliases"!


"Loose Methods"!

"End of package definition"!

"Source Globals"!

"Classes"!

LightsOutBoard guid: (GUID fromString: '{101ec469-9108-4c0d-811b-b089d93c8cb1}')!
LightsOutBoard comment: ''!
!LightsOutBoard categoriesForClass!Kernel-Objects! !
!LightsOutBoard methodsFor!

cells
	^cells!

setSize: anInteger
	cells := (1 to: anInteger squared) collect: [:each | true asValue ]!

size
	^cells size sqrt truncated! !
!LightsOutBoard categoriesFor: #cells!public! !
!LightsOutBoard categoriesFor: #setSize:!public! !
!LightsOutBoard categoriesFor: #size!public! !

!LightsOutBoard class methodsFor!

defaultSize
	^10!

new
	^self withSize: self defaultSize!

withSize: anInteger
	^super new setSize: anInteger! !
!LightsOutBoard class categoriesFor: #defaultSize!public! !
!LightsOutBoard class categoriesFor: #new!public! !
!LightsOutBoard class categoriesFor: #withSize:!public! !

LightsOutCell guid: (GUID fromString: '{0ebc274e-0fcb-462c-9499-dcdb217482b3}')!
LightsOutCell comment: ''!
!LightsOutCell categoriesForClass!MVP-Presenters! !
!LightsOutCell methodsFor!

toggle
	self model value: self model value not
! !
!LightsOutCell categoriesFor: #toggle!public! !

!LightsOutCell class methodsFor!

defaultModel
	^true asValue!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.LightsOutCellView) 34 12 nil nil 34 2 8 1140850688 1 416 721990 2 ##(Smalltalk.ValueHolder) nil false 1310726 ##(Smalltalk.EqualitySearchPolicy) true nil nil 7 nil nil nil 416 983302 ##(Smalltalk.MessageSequence) 138 144 34 1 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 2047 21 658 201 201 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 1 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 3 0 0 10 0 0 0 99 4 0 0 110 0 0 0] 8 #() 658 193 193 nil 27 )! !
!LightsOutCell class categoriesFor: #defaultModel!public! !
!LightsOutCell class categoriesFor: #resource_Default_view!public!resources-views! !

LightsOutGame guid: (GUID fromString: '{74039647-b9be-4854-845e-629822a676ad}')!
LightsOutGame comment: ''!
!LightsOutGame categoriesForClass!MVP-Presenters! !
!LightsOutGame methodsFor!

clearExistingCellPresenters
	cellPresenters do: [:each | each destroy]!

createCellPresenters
	self clearExistingCellPresenters.
	self view layoutManager rows: self model size.
	self model cells do: 
			[:eachCell |
			| cp |
			cp := LightsOutCell createIn: self on: eachCell.
			cellPresenters add: cp.
			cp when: #cellAction perform: [self toggleNeighborsOf: cp]]!

initialize
	super initialize.
	cellPresenters := OrderedCollection new!

model: aLightsOutGameBoard
	super model: aLightsOutGameBoard.
	self hasView ifTrue: [self createCellPresenters ]!

neighborsOf: aLightsOutCell 
	| cpRect |
	cpRect := aLightsOutCell view rectangle.
	^cellPresenters select: [:each || eachRect |
	eachRect := each view rectangle.
	eachRect bottomRight = cpRect topLeft | (eachRect topLeft  = cpRect bottomRight)
	| (eachRect topRight  = cpRect bottomLeft ) | (eachRect bottomLeft = cpRect topRight)]!

onViewOpened
	super onViewOpened.
	self createCellPresenters!

toggleNeighborsOf: aLightsOutCell
	(self neighborsOf: aLightsOutCell) do: [:eachCell | eachCell toggle]! !
!LightsOutGame categoriesFor: #clearExistingCellPresenters!public! !
!LightsOutGame categoriesFor: #createCellPresenters!public! !
!LightsOutGame categoriesFor: #initialize!public! !
!LightsOutGame categoriesFor: #model:!public! !
!LightsOutGame categoriesFor: #neighborsOf:!public! !
!LightsOutGame categoriesFor: #onViewOpened!public! !
!LightsOutGame categoriesFor: #toggleNeighborsOf:!public! !

!LightsOutGame class methodsFor!

defaultModel
	^LightsOutBoard new!

icon

	"Generated from:
	self createIconMethod: #icon ofSize: 48@48 fromFile: 'C:\Users\kcdeb\OneDrive\Desktop\Screen Shot 2019-03-11 at 5.16.22 PM.png'.
	"
	^InternalIcon fromBytes: #[137 80 78 71 13 10 26 10 0 0 0 13 73 72 68 82 0 0 0 48 0 0 0 48 8 6 0 0 0 87 2 249 135 0 0 0 1 115 82 71 66 0 174 206 28 233 0 0 0 4 103 65 77 65 0 0 177 143 11 252 97 5 0 0 0 9 112 72 89 115 0 0 14 195 0 0 14 195 1 199 111 168 100 0 0 6 35 73 68 65 84 104 67 237 89 11 80 149 69 20 190 142 111 196 55 168 168 40 42 227 3 84 124 160 136 34 162 35 37 34 10 136 35 230 3 102 50 226 49 42 146 90 1 145 8 248 40 140 106 0 201 156 129 30 70 19 41 69 4 35 145 102 52 68 97 69 68 79 42 162 236 33 244 38 122 143 219 253 118 216 237 236 127 247 206 56 32 10 197 12 223 112 207 119 191 221 255 156 187 123 246 156 189 215 196 152 249 175 13 167 79 7 177 37 75 94 145 54 144 145 17 203 54 111 126 92 225 118 237 186 159 37 36 164 42 220 186 117 207 176 227 199 111 81 184 57 115 222 98 101 101 190 210 110 105 177 101 38 243 203 214 86 27 201 213 213 185 114 206 136 133 11 95 147 26 32 43 43 154 109 216 240 148 194 237 221 123 15 94 253 75 244 4 112 61 2 72 79 143 99 2 225 225 185 108 210 164 79 165 13 192 177 121 243 222 80 184 165 75 95 102 43 87 190 160 112 51 103 190 195 31 64 185 177 99 191 100 17 17 57 210 62 120 240 78 238 220 161 67 119 72 142 59 97 230 140 152 48 161 81 106 128 224 224 83 204 205 173 70 225 124 124 206 49 147 167 103 37 19 152 54 237 3 54 120 240 207 210 6 156 156 26 152 157 93 179 194 57 56 124 197 198 143 255 66 225 70 140 248 142 77 153 242 177 194 13 26 244 11 115 113 121 87 218 30 30 85 90 103 251 246 253 83 25 55 125 250 251 90 221 200 145 223 42 58 124 64 120 75 46 201 181 218 66 70 140 26 117 73 25 87 92 236 175 213 117 153 28 48 226 255 29 64 92 92 58 19 88 187 246 89 243 190 186 40 109 0 137 50 99 198 123 10 135 164 198 126 166 28 246 191 175 111 153 194 193 177 144 144 2 105 239 216 241 160 214 49 27 155 86 101 92 80 208 105 173 110 234 212 15 21 221 130 5 175 51 211 250 245 79 51 1 36 6 18 133 114 200 124 221 100 72 52 170 67 66 33 48 202 13 27 246 3 63 177 132 141 85 194 216 192 192 66 201 33 104 227 220 0 14 5 161 1 230 206 125 147 31 28 148 67 64 144 203 37 177 182 133 116 15 232 86 133 76 247 128 158 0 218 184 14 7 16 26 154 207 4 188 188 42 120 209 162 28 246 181 238 1 174 174 117 138 110 220 184 139 60 169 40 55 124 248 247 108 249 242 179 210 70 66 99 44 28 17 220 234 213 207 91 204 13 32 23 133 6 112 119 175 102 142 142 141 10 135 195 197 132 147 65 192 223 191 88 59 25 42 52 213 225 147 213 233 86 172 120 81 209 217 219 55 241 132 21 118 100 228 49 174 139 138 202 150 28 142 232 129 3 127 149 54 16 16 80 196 70 143 254 70 225 112 26 58 59 215 43 28 255 112 205 143 150 75 130 45 100 116 10 208 213 1 157 174 189 91 72 87 7 218 157 3 70 167 128 246 6 224 226 114 161 123 7 144 145 81 206 202 203 151 73 187 83 2 240 246 62 207 4 144 152 70 167 0 60 128 234 144 176 58 29 10 11 213 37 38 158 99 139 23 151 75 27 135 4 116 248 47 56 36 39 186 81 97 3 104 205 209 21 83 206 217 249 35 158 83 148 115 116 252 156 153 208 155 11 108 217 242 24 155 56 241 51 105 3 107 214 60 103 225 40 128 211 133 234 208 54 163 103 167 156 131 131 249 1 166 203 22 99 15 28 184 75 106 98 99 51 152 173 109 139 50 46 44 44 151 59 71 57 28 211 179 102 213 42 28 130 192 148 114 73 58 163 14 232 198 118 106 14 244 4 64 184 107 18 0 238 182 2 179 103 191 205 59 72 202 241 142 207 172 55 2 119 103 170 67 130 161 50 82 14 137 168 27 139 252 17 154 69 139 94 101 253 250 253 161 140 67 224 67 134 252 164 112 232 126 81 220 40 135 124 53 33 161 4 54 109 122 130 95 166 41 231 231 87 194 3 163 28 218 238 101 203 94 82 56 107 247 216 176 176 60 169 73 76 76 209 106 112 119 166 115 225 48 65 235 76 57 28 38 56 37 41 199 79 53 243 20 114 73 172 109 161 43 189 145 233 156 211 21 50 35 58 61 7 122 2 104 211 116 74 0 40 64 2 216 119 184 159 82 14 137 51 116 232 143 10 135 235 30 218 110 202 89 75 88 228 148 208 88 203 147 62 125 254 82 230 66 17 67 135 74 185 49 99 190 230 137 77 57 180 220 166 19 39 110 102 2 49 49 153 188 101 165 28 250 110 156 20 148 195 9 128 214 155 114 56 57 182 109 123 68 225 120 169 215 56 156 157 29 37 53 72 70 4 79 199 237 220 249 0 63 229 40 135 93 128 182 131 114 171 86 149 98 45 204 127 109 232 232 22 234 178 133 172 39 0 3 174 106 0 168 188 2 40 40 72 40 202 33 153 80 41 41 215 191 255 239 108 192 128 223 20 14 45 49 180 148 235 221 251 111 109 0 56 20 132 6 251 191 87 175 203 202 56 248 129 177 148 195 220 120 6 229 224 135 169 164 196 143 9 88 171 148 40 253 84 135 79 27 201 77 57 36 58 146 143 114 147 39 127 194 210 210 226 165 141 21 198 124 133 133 129 146 59 118 44 146 59 35 108 32 57 57 201 194 7 0 95 146 81 29 255 146 192 252 150 92 18 241 0 35 58 178 133 218 123 165 52 250 0 92 81 14 232 6 118 233 0 48 153 64 126 126 168 118 224 198 141 79 74 13 16 29 157 197 246 237 59 162 112 104 182 50 51 99 20 14 77 96 81 81 128 180 47 93 26 197 231 107 110 182 147 92 117 181 59 239 100 133 13 156 58 21 108 225 3 128 27 31 213 225 54 103 210 9 187 23 12 4 150 189 166 198 77 130 47 147 65 3 108 223 254 176 162 243 241 57 203 146 146 146 21 14 95 136 229 228 220 42 237 202 74 79 62 182 170 202 67 114 214 62 109 92 236 133 6 136 143 79 211 234 44 2 208 213 1 163 6 184 154 57 96 156 27 208 213 1 157 238 191 23 192 252 249 23 88 125 189 179 4 28 53 106 0 124 191 73 117 104 240 82 83 19 20 14 87 204 220 220 112 105 99 43 96 108 109 237 44 201 225 60 55 206 13 224 0 16 26 96 255 254 187 181 186 238 159 196 77 77 246 76 32 47 47 76 43 66 197 163 186 136 136 135 216 238 221 247 41 28 238 206 71 143 198 41 28 18 177 160 32 68 218 13 13 78 124 190 198 198 9 146 171 168 240 226 119 11 97 3 39 79 222 100 225 3 128 223 240 168 14 237 63 222 146 251 172 167 18 95 143 0 206 159 247 102 2 41 41 137 218 129 248 37 145 234 176 165 182 110 125 84 225 240 21 199 158 61 247 42 28 110 119 233 233 183 73 187 180 244 70 62 223 153 51 55 72 14 219 22 191 228 8 27 56 124 248 118 11 31 0 252 200 65 117 161 161 249 236 31 203 196 63 32 26 65 238 152 0 0 0 0 73 69 78 68 174 66 96 130]!

Initialize

	Smalltalk developmentSystem addSamplesFolderIconFor: self description: 'Lights Out Game'!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.ShellView) 34 27 nil nil 8 #(13303808 65536) 416 nil 786694 ##(Smalltalk.IndexedColor) 33554465 nil 39 nil nil nil 416 656390 ##(Smalltalk.GridLayout) 3 1 1 1 170 192 8 #() nil nil nil nil nil 1 nil nil nil nil 1 nil nil 983302 ##(Smalltalk.MessageSequence) 138 144 34 3 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 2307 21 674 941 821 416 626 #text: 34 1 8 'Lights Out' 416 626 #updateMenuBar 544 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 0 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 129 4 0 0 10 0 0 0 87 6 0 0 164 1 0 0] 8 #() 674 193 193 nil 27 )!

uninitialize
	Smalltalk developmentSystem removeSystemFolderIconNamed: 'Lights Out Game'! !
!LightsOutGame class categoriesFor: #defaultModel!public! !
!LightsOutGame class categoriesFor: #icon!constants!public! !
!LightsOutGame class categoriesFor: #Initialize!public! !
!LightsOutGame class categoriesFor: #resource_Default_view!public!resources-views! !
!LightsOutGame class categoriesFor: #uninitialize!public! !

LightsOutCellView guid: (GUID fromString: '{04f6c75e-234b-48c9-b414-f74e5c602c93}')!
LightsOutCellView comment: ''!
!LightsOutCellView categoriesForClass!MVP-Resources-Misc! !
!LightsOutCellView methodsFor!

colorWhenOn
	^(Color yellow)!

connectModel
	self model when: #valueChanged send: #invalidate to: self!

onLeftButtonReleased: aMouseEvent
	self presenter trigger: #cellAction!

onPaintRequired: aPaintEvent
	self model value
		ifTrue: [|cellRect canvas|
			cellRect := self  clientRectangle insetBy: 5.
			canvas := aPaintEvent canvas.
			canvas fillRectangle: cellRect color: self colorWhenOn ]! !
!LightsOutCellView categoriesFor: #colorWhenOn!public! !
!LightsOutCellView categoriesFor: #connectModel!public! !
!LightsOutCellView categoriesFor: #onLeftButtonReleased:!public! !
!LightsOutCellView categoriesFor: #onPaintRequired:!public! !

!LightsOutCellView class methodsFor!

defaultModel
	^true asValue!

resource_Default_view
	"Answer the literal data from which the 'Default view' resource can be reconstituted.
	DO NOT EDIT OR RECATEGORIZE THIS METHOD.

	If you wish to modify this resource evaluate:
	ViewComposer openOn: (ResourceIdentifier class: self selector: #resource_Default_view)
	"

	^#(#'!!STL' 4 788558 10 ##(Smalltalk.STBViewProxy) ##(Smalltalk.LightsOutCellView) 34 12 nil nil 34 2 8 1140850688 1 416 721990 2 ##(Smalltalk.ValueHolder) nil false 1310726 ##(Smalltalk.EqualitySearchPolicy) true 524550 ##(Smalltalk.ColorRef) 8 4278190080 nil 5 nil nil nil 416 983302 ##(Smalltalk.MessageSequence) 138 144 34 1 721670 ##(Smalltalk.MessageSend) #createAt:extent: 34 2 328198 ##(Smalltalk.Point) 1 1 706 201 201 416 983302 ##(Smalltalk.WINDOWPLACEMENT) 8 #[44 0 0 0 0 0 0 0 0 0 0 0 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 255 0 0 0 0 0 0 0 0 100 0 0 0 100 0 0 0] 8 #() 706 193 193 nil 27 )! !
!LightsOutCellView class categoriesFor: #defaultModel!public! !
!LightsOutCellView class categoriesFor: #resource_Default_view!public!resources-views! !

"Binary Globals"!

